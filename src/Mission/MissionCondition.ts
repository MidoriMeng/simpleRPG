class MissionCondition implements Observer{
    protected _meetDemand = false;
    fatherFunc: Function;

    constructor() {
    }

    meetDemand(): boolean {
        return this._meetDemand;
    }
    
    onChange(...a){}

}

class LevelMissionCondition extends MissionCondition {
    targetLevel: number;
    constructor(targetLevel: number) {
        super();
        this.targetLevel = targetLevel;
        Player.getInstance().addObserver(this);
    }

    meetDemand(): boolean {
        if (!this._meetDemand)
            this.onChange(Player.getInstance());
        return this._meetDemand;
    }

    onChange(player: Player) {
        if (!this._meetDemand)
            if (player.level >= this.targetLevel) {
                this._meetDemand = true;
                if (this.fatherFunc)
                    this.fatherFunc();
            }
    }
}

class TalkMissionCondition extends MissionCondition {

}

class KillMonsterMissionCondition extends MissionCondition {
    request: { [name: string]: { current: number, total: number } };
    fatherFunc: Function;
    protected _meetDemand = false;

    constructor(datas: { [name: string]: number }[]) {
        super();
        this.request = {};
        for (var index in datas) {
            this.request[index] = { current: 0, total: Number(datas[index]) };
        }
        MonsterService.getInstance().addObserver(this);
    }

    onChange(monster: Monster): boolean {
        if (monster.status == MonsterStatus.DEAD) {
            var m = this.request[monster.name];
            if (m == null)
                return false;
            m.current++;
            //console.log("kill " + monster.name + " " + m.current);
            if (!this._meetDemand) {
                this._meetDemand = true;
                for (var name in this.request)
                    if (this.request[name].current < this.request[name].total)
                        this._meetDemand = false;
            }
            if (this._meetDemand)
                if (this.fatherFunc) {
                    this.fatherFunc();
                } else
                    console.error("no father function");
            return true;
        }
        return false;
    }
}

