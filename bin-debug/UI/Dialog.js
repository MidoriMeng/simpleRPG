var DIALOG_WIDTH = 500;
var DIALOG_HEIGHT = 200;
var DIALOG_PORTRAIT_SIZE = 144;
var DIALOG_SIZE = 24;
var DIALOG_NAME_SIZE = 30;
var DIALOG_INTERVAL = 28;
/**包含对话和任务 */
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog(obj, dialogComponent, missions) {
        _super.call(this);
        this.missionList = missions;
        //背景
        this.bg = new egret.Shape();
        this.bg.graphics.beginFill(0x000000);
        this.bg.graphics.drawRect(0, 0, DIALOG_WIDTH, DIALOG_HEIGHT);
        this.bg.graphics.endFill();
        this.bg.alpha = 0.5;
        this.addChild(this.bg);
        //头像
        this.portrait = obj.portrait;
        this.portrait.width = this.portrait.height = DIALOG_PORTRAIT_SIZE;
        this.portrait.x = this.portrait.y = DIALOG_INTERVAL;
        this.addChild(this.portrait);
        //名字
        this.speaker = new egret.TextField;
        this.speaker.text = obj.name;
        this.speaker.bold = true;
        this.speaker.textColor = 0xffffff;
        this.speaker.size = DIALOG_NAME_SIZE;
        this.speaker.x = DIALOG_INTERVAL * 2 + DIALOG_PORTRAIT_SIZE;
        this.speaker.y = DIALOG_INTERVAL;
        this.addChild(this.speaker);
        //对话内容
        this.component = new egret.TextField;
        //this.component.text = dialogComponent;
        this.component.text = this.missionList[0].name;
        this.component.size = DIALOG_SIZE;
        this.component.x = this.speaker.x;
        this.component.y = DIALOG_INTERVAL * 2 + this.speaker.height;
        this.component.width = DIALOG_WIDTH - 3 * DIALOG_INTERVAL - DIALOG_PORTRAIT_SIZE;
        this.component.height = DIALOG_HEIGHT - 3 * DIALOG_INTERVAL - this.speaker.height;
        this.addChild(this.component);
        //mission todo
        /*var mission = new egret.TextField();
        mission.text = this.missionList[0].name;
        this.component.size = DIALOG_SIZE;
        this.addChild(mission);*/
    }
    var d = __define,c=Dialog,p=c.prototype;
    return Dialog;
}(egret.DisplayObjectContainer));
egret.registerClass(Dialog,'Dialog');
//# sourceMappingURL=Dialog.js.map