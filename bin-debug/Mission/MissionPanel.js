/**一直显示 */
var MissionPanel = (function (_super) {
    __extends(MissionPanel, _super);
    function MissionPanel() {
        _super.call(this);
        this.missionList = [];
        var service = MissionService.getInstance();
        service.addObserver(this);
        var missionList = service.getMissionByCustomRule(this.rule_interactable, this);
        for (var i in this.missionList) {
            //todo : 生成显示列表
            console.log("generate " + this.missionList[i].name + " @missionPanel");
        }
    }
    var d = __define,c=MissionPanel,p=c.prototype;
    /**include  during, submittable */
    p.rule_interactable = function (missions, self) {
        for (var index in missions) {
            var status = missions[index].status;
            if (status == MissionStatus.DURING ||
                status == MissionStatus.SUBMITTABLE) {
                self.missionList.push(missions[index]);
            }
        }
    };
    p.addMission = function (mission) {
        if (this.missionList.indexOf(mission) < 0) {
            this.missionList.push(mission);
            this.updatePanel();
        }
        else
            return;
    };
    p.deleteMission = function (mission) {
        var index = this.missionList.indexOf(mission);
        if (index != -1) {
            this.missionList.splice(index, 1);
            this.updatePanel();
        }
        else
            console.error("nothing to delete");
    };
    p.onChange = function (mission) {
        var shouldDisplay = (mission.status == MissionStatus.DURING || mission.status == MissionStatus.SUBMITTABLE);
        var newElement = Boolean(this.missionList.indexOf(mission) == -1);
        if (newElement && shouldDisplay)
            this.addMission(mission);
        if (shouldDisplay)
            this.updatePanel();
        else if (!newElement && !shouldDisplay)
            this.deleteMission(mission);
    };
    p.updatePanel = function () {
        this.missionList.sort(function (a, b) {
            var valueA, valueB;
            var result = 0;
            return b.status - a.status +
                0.01 * (Number(b.getFromID()) - Number(a.getFromID())); //降序
        });
        //show list
    };
    return MissionPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(MissionPanel,'MissionPanel',["MissionObserver","Observer"]);
//# sourceMappingURL=MissionPanel.js.map