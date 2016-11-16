//???必须放在开头，为什么？
var MissionStatus;
(function (MissionStatus) {
    MissionStatus[MissionStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    MissionStatus[MissionStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    MissionStatus[MissionStatus["DURING"] = 2] = "DURING";
    MissionStatus[MissionStatus["SUBMITTABLE"] = 3] = "SUBMITTABLE";
    MissionStatus[MissionStatus["SUBMITTED"] = 4] = "SUBMITTED"; //不显示
})(MissionStatus || (MissionStatus = {}));
//防御式
var MissionService = (function () {
    function MissionService() {
        //储存所有任务，待优化
        this.observerList = new Array();
        this.missionList = {
            "00100201": new Mission("00100201", "mission1:welcome", "welcome to egret", MissionStatus.UNACCEPTABLE, Mission.acceptRules("level", 1))
        };
        //init all missions
        if (MissionService.instance)
            throw new Error("don't use constructor of MissionSystem");
        MissionService.instance = this;
    }
    var d = __define,c=MissionService,p=c.prototype;
    MissionService.getInstance = function () {
        if (MissionService.instance == null)
            MissionService.instance = new MissionService();
        return MissionService.instance;
    };
    /**引用 */
    p.onStart = function () {
    };
    p.getMissionById = function (missionID) {
        return this.missionList[missionID];
    };
    p.getMissionByCustomRule = function (rule, self) {
        rule(this.missionList, self);
    };
    p.notify = function (mission) {
        for (var i in this.observerList) {
            this.observerList[i].onChange(mission);
        }
    };
    p.addMission = function (mission) {
        this.missionList[mission.id] = mission;
    };
    p.toAcceptable = function (missionID, player) {
        var m = this.missionList[missionID];
        if (m.toAcceptable(player)) {
            this.notify(m);
            return true;
        }
        console.error("can't to acceptable");
        return false;
    };
    p.acceptMission = function (missionID, player) {
        var m = this.missionList[missionID];
        if (m.accept()) {
            this.notify(m);
            return true;
        }
        console.error("the mission is not acceptable");
        return false;
    };
    p.toSubmittable = function (missionID, player) {
        var m = this.missionList[missionID];
        if (m.toSubmittable(player)) {
            this.notify(m);
            return true;
        }
        console.error("the mission is not acceptable");
        return false;
    };
    p.submitMission = function (missionID, player) {
        var m = this.missionList[missionID];
        if (m.submit()) {
            this.notify(m);
            return true;
        }
        console.error("can't submit mission");
        return false;
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    p.haveID = function (id) {
        if (this.missionList[id])
            return true;
        else
            return false;
    };
    /**更新任务状态 */
    p.onChange = function (player) {
        for (var id in this.missionList) {
            var mission = this.missionList[id];
            if (mission.status == MissionStatus.UNACCEPTABLE) {
                if (mission.toAcceptable(player))
                    this.notify(mission);
            }
            if (mission.status == MissionStatus.DURING) {
                if (mission.toSubmittable(player))
                    this.notify(mission);
            }
        }
    };
    MissionService.instance = new MissionService();
    return MissionService;
}());
egret.registerClass(MissionService,'MissionService',["Observer"]);
//# sourceMappingURL=MissionSystem.js.map