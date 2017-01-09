var UIService = (function (_super) {
    __extends(UIService, _super);
    function UIService() {
        _super.call(this);
        //this.dialog = new Dialog();
    }
    var d = __define,c=UIService,p=c.prototype;
    UIService.getInstance = function () {
        if (UIService.instance == null)
            UIService.instance = new UIService();
        return UIService.instance;
    };
    p.displayDialog = function (dialog) {
        this.dialog = dialog;
        this.addChild(this.dialog);
        //this.dialog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextDialog, this);
    };
    /**对话结束返回true */
    p.nextDialog = function () {
        if (!this.dialog.nextDialog()) {
            this.removeDialog();
            return true;
        }
        return false;
    };
    p.removeDialog = function () {
        this.removeChild(this.dialog);
        //todo delete
        MissionService.getInstance().submitMission(this.dialog.mission.getID());
        MissionService.getInstance().acceptMission(this.dialog.mission.getID());
    };
    return UIService;
}(egret.DisplayObjectContainer));
egret.registerClass(UIService,'UIService');
//# sourceMappingURL=UIService.js.map