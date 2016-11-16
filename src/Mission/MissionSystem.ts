
//???必须放在开头，为什么？
enum MissionStatus {
    UNACCEPTABLE,//灰叹号
    ACCEPTABLE,//黄叹号
    DURING,//不显示/不显示
    SUBMITTABLE,//黄问号
    SUBMITTED//不显示
}

//防御式
class MissionService implements Observer {
    private static instance = new MissionService();
    player: Player;

    //储存所有任务，待优化
    private observerList: Array<MissionObserver> = new Array<MissionObserver>();
    private missionList: missionList = {
        "00100201": new Mission("00100201", "mission1:welcome", "welcome to egret",
            MissionStatus.UNACCEPTABLE, Mission.acceptRules("level", 1))
        //"00200101": new Mission("00200101", "welcome2", "welcome ww", MissionStatus.DURING),
        //"00200301": new Mission("00200301", "welcome2", "welcome ww", MissionStatus.ACCEPTABLE)
    };

    static getInstance(): MissionService {
        if (MissionService.instance == null)
            MissionService.instance = new MissionService();
        return MissionService.instance;
    }

    /**引用 */
    onStart() {
    }

    getMissionById(missionID: string): Mission {
        return this.missionList[missionID];
    }

    getMissionByCustomRule(rule: Function, self: any) {
        rule(this.missionList, self);
    }

    constructor() {
        //init all missions
        if (MissionService.instance)
            throw new Error("don't use constructor of MissionSystem");
        MissionService.instance = this;
    }



    notify(mission: Mission) {
        for (let i in this.observerList) {
            this.observerList[i].onChange(mission);
        }
    }

    addMission(mission: Mission) {
        this.missionList[mission.id] = mission;
    }

    toAcceptable(missionID: string, player?: Player): boolean {
        var m = this.missionList[missionID];
        if (m.toAcceptable(player)) {
            this.notify(m);
            return true;
        }
        console.error("can't to acceptable");
        return false;
    }

    acceptMission(missionID: string, player?: Player) {
        var m = this.missionList[missionID];
        if (m.accept()) {
            this.notify(m);
            return true;
        }
        console.error("the mission is not acceptable");
        return false;
    }

    toSubmittable(missionID: string, player?: Player) {
        var m = this.missionList[missionID];
        if (m.toSubmittable(player)) {
            this.notify(m);
            return true;
        }
        console.error("the mission is not acceptable");
        return false;
    }

    submitMission(missionID: string, player?: Player) {
        var m = this.missionList[missionID];
        if (m.submit()) {
            this.notify(m);
            return true;
        }
        console.error("can't submit mission");
        return false;
    }

    addObserver(observer: MissionObserver) {
        this.observerList.push(observer);
    }

    haveID(id: string): boolean {
        if (this.missionList[id])
            return true;
        else
            return false;
    }

    /**更新任务状态 */
    onChange(player: Player) {
        for (var id in this.missionList) {
            var mission = this.missionList[id];
            if (mission.status == MissionStatus.UNACCEPTABLE) {
                if (mission.toAcceptable(player))
                    this.notify(mission);
            }
            if (mission.status == MissionStatus.DURING) {
                if( mission.toSubmittable(player))
                    this.notify(mission);
            }
        }
    }
    /*deleteObserver(observer:MissionObserver){
        this.observerList.
    }*/
}





type missionList = {
    [index: string]: Mission
};

interface MissionObserver extends Observer {
    onChange(mission: Mission);
}



interface Observer {
    onChange(...a);
}