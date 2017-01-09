var MissionStatus;
(function (MissionStatus) {
    MissionStatus[MissionStatus["SUBMITTED"] = 0] = "SUBMITTED";
    MissionStatus[MissionStatus["UNACCEPTABLE"] = 1] = "UNACCEPTABLE";
    MissionStatus[MissionStatus["DURING"] = 2] = "DURING";
    MissionStatus[MissionStatus["ACCEPTABLE"] = 3] = "ACCEPTABLE";
    MissionStatus[MissionStatus["SUBMITTABLE"] = 4] = "SUBMITTABLE";
})(MissionStatus || (MissionStatus = {}));
//防御式
var MissionService = (function () {
    function MissionService() {
        //储存所有任务，待优化
        this.observerList = new Array();
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
    p.loadMissions = function () {
        this.missionList = {};
        this.missionList = createMissionsFactory();
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
    p.toAcceptable = function (missionID) {
        var m = this.missionList[missionID];
        if (m.toAcceptable()) {
            this.notify(m);
            return true;
        }
        console.error("can't to acceptable" + missionID);
        return false;
    };
    p.toAcceptable_all = function () {
        for (var index in this.missionList) {
            this.toAcceptable(index);
        }
    };
    p.acceptMission = function (missionID) {
        var m = this.missionList[missionID];
        if (m.accept()) {
            this.toSubmittable(missionID);
            this.notify(m);
            return true;
        }
        return false;
    };
    p.toSubmittable = function (missionID) {
        var m = this.missionList[missionID];
        if (m.toSubmittable()) {
            this.notify(m);
            return true;
        }
        return false;
    };
    p.submitMission = function (missionID, player) {
        var m = this.missionList[missionID];
        if (m.submit()) {
            this.notify(m);
            return true;
        }
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
    MissionService.instance = new MissionService();
    return MissionService;
}());
egret.registerClass(MissionService,'MissionService',["EventEmitter"]);
//# sourceMappingURL=MissionSystem.js.map