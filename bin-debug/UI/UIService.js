var UIService = (function (_super) {
    __extends(UIService, _super);
    function UIService() {
        _super.apply(this, arguments);
    }
    var d = __define,c=UIService,p=c.prototype;
    p.showDialog = function () {
        this.addChild(this.dialog);
    };
    p.removeDialog = function () {
        this.removeChild(this.dialog);
    };
    return UIService;
}(egret.DisplayObjectContainer));
egret.registerClass(UIService,'UIService');
//# sourceMappingURL=UIService.js.map