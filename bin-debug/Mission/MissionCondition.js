var MissionCondition = (function () {
    function MissionCondition() {
        this._meetDemand = false;
    }
    var d = __define,c=MissionCondition,p=c.prototype;
    p.meetDemand = function () {
        return this._meetDemand;
    };
    p.onChange = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i - 0] = arguments[_i];
        }
    };
    return MissionCondition;
}());
egret.registerClass(MissionCondition,'MissionCondition',["Observer"]);
var LevelMissionCondition = (function (_super) {
    __extends(LevelMissionCondition, _super);
    function LevelMissionCondition(targetLevel) {
        _super.call(this);
        this.targetLevel = targetLevel;
        Player.getInstance().addObserver(this);
    }
    var d = __define,c=LevelMissionCondition,p=c.prototype;
    p.meetDemand = function () {
        if (!this._meetDemand)
            this.onChange(Player.getInstance());
        return this._meetDemand;
    };
    p.onChange = function (player) {
        if (!this._meetDemand)
            if (player.level >= this.targetLevel) {
                this._meetDemand = true;
                if (this.fatherFunc)
                    this.fatherFunc();
            }
    };
    return LevelMissionCondition;
}(MissionCondition));
egret.registerClass(LevelMissionCondition,'LevelMissionCondition');
var TalkMissionCondition = (function (_super) {
    __extends(TalkMissionCondition, _super);
    function TalkMissionCondition() {
        _super.apply(this, arguments);
    }
    var d = __define,c=TalkMissionCondition,p=c.prototype;
    return TalkMissionCondition;
}(MissionCondition));
egret.registerClass(TalkMissionCondition,'TalkMissionCondition');
var KillMonsterMissionCondition = (function (_super) {
    __extends(KillMonsterMissionCondition, _super);
    function KillMonsterMissionCondition(datas) {
        _super.call(this);
        this._meetDemand = false;
        this.request = {};
        for (var index in datas) {
            this.request[index] = { current: 0, total: Number(datas[index]) };
        }
        MonsterService.getInstance().addObserver(this);
    }
    var d = __define,c=KillMonsterMissionCondition,p=c.prototype;
    p.onChange = function (monster) {
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
                }
                else
                    console.error("no father function");
            return true;
        }
        return false;
    };
    return KillMonsterMissionCondition;
}(MissionCondition));
egret.registerClass(KillMonsterMissionCondition,'KillMonsterMissionCondition');
//# sourceMappingURL=MissionCondition.js.map