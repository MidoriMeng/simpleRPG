const DIALOG_WIDTH = 500;
const DIALOG_HEIGHT = 200;
const DIALOG_PORTRAIT_SIZE = 144;
const DIALOG_SIZE = 24;
const DIALOG_NAME_SIZE = 30;
const DIALOG_INTERVAL = 28;

/**包含对话和任务 */
class Dialog extends egret.DisplayObjectContainer {
    component: egret.TextField;
    speaker: egret.TextField;
    bg: egret.Shape;
    portrait: egret.Bitmap;
    missionList: Mission[];

    public constructor(obj: Dialogable, dialogComponent: string, missions: Mission[]) {
        super();
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
}