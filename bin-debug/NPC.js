/*
class NPC_move extends NPC_stand implements Movable {
    curAnimation: Animation;
    animationList;
    velocity: number;

    constructor(id: string, name: string,
        appearances: appearance_4, orientation: DIRECTION,
        portrait: string,
        velocity:number, animationList,
         x?: number, y?: number){
            super(id,name,appearances,orientation,portrait,x,y);
            this.animationList = animationList;
            this.velocity = velocity;
            this.curAnimation = null;
    }

}*/
var NPC_stand = (function (_super) {
    __extends(NPC_stand, _super);
    /**ID为三位 */
    function NPC_stand(id, name, appearances, orientation, portrait) {
        _super.call(this);
        this.missionList = [];
        this.id = id;
        this.name = name;
        this.appearances = appearances;
        this.changeOrientation(orientation);
        this.portrait = new egret.Bitmap(RES.getRes(portrait));
        this.touchEnabled = true;
        var service = MissionService.getInstance();
        //regester itself in MissionService
        service.addObserver(this);
        service.getMissionByCustomRule(this.rule_all_interactableFirst, this);
        //show emoji
        this.emoji = new egret.Bitmap(RES.getRes("empty_png"));
        this.showEmoji();
        this.emoji.y = -this.emoji.height;
        this.addChild(this.emoji);
        //add listener
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDialog, this);
        this.addChild(this.appearance);
    }
    var d = __define,c=NPC_stand,p=c.prototype;
    p.setPosition = function (pos) {
        this.x = pos.x;
        this.y = pos.y;
    };
    /**更新orientation和appearance */
    p.changeOrientation = function (direction) {
        this.orientation = direction;
        var str;
        switch (direction) {
            case DIRECTION.SOUTH:
                str = "SOUTH";
                break;
            case DIRECTION.EAST:
                str = "EAST";
                break;
            case DIRECTION.NORTH:
                str = "NORTH";
                break;
            case DIRECTION.WEST:
                str = "WEST";
                break;
        }
        this.appearance = new egret.Bitmap(this.appearances[str]);
    };
    p.showDialog = function () {
        console.log("show");
        this.dialog = new Dialog(this, "blabla", this.missionList);
        this.addChild(this.dialog);
        this.dialog.touchEnabled = true;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showDialog, this);
        this.dialog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDialog, this);
    };
    //todo 挪走
    p.clickDialog = function () {
        console.log("delete");
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDialog, this);
        this.removeChild(this.dialog);
        delete (this.dialog);
        /**来不及了只能这么写了orz */
        if (this.id == "001") {
            MissionService.getInstance().acceptMission("00100201");
            MissionService.getInstance().toSubmittable("00100201");
        }
        if (this.id == "002")
            MissionService.getInstance().submitMission("00100201");
    };
    /**把所有收/发人是自己的任务加到自己的队列中 */
    p.rule_all = function (missions, self) {
        for (var index in missions) {
            //var pattern = new RegExp(this.id, "\d{3}");
            var fromId = missions[index].getFromID();
            var toId = missions[index].getToID();
            if (self.id == fromId || self.id == toId) {
                self.missionList.push(missions[index]);
            }
        }
    };
    p.rule_all_interactableFirst = function (missions, self) {
        self.rule_all(missions, self);
        self.missionList.sort(function (a, b) {
            var valueA, valueB;
            var result = 0;
            return b.status - a.status +
                0.01 * (Number(b.getFromID()) - Number(a.getFromID())); //降序
        });
    };
    p.onChange = function (mission) {
        if (mission.getFromID() == this.id || mission.getToID() == this.id) {
            this.missionList[mission.id] = mission;
            this.sort();
            this.showEmoji();
        }
    };
    p.sort = function () {
        this.missionList.sort(function (a, b) {
            var valueA, valueB;
            var result = 0;
            return b.status - a.status +
                0.01 * (Number(b.getFromID()) - Number(a.getFromID())); //降序
        });
    };
    p.showEmoji = function () {
        if (this.missionList.length) {
            var fromID = this.missionList[0].getFromID();
            var toID = this.missionList[0].getToID();
            switch (this.missionList[0].status) {
                case MissionStatus.ACCEPTABLE:
                    if (fromID == this.id)
                        this.emoji.texture = RES.getRes("Balloon_exclamation_png");
                    break;
                case MissionStatus.DURING:
                    if (toID == this.id)
                        this.emoji.texture = RES.getRes("Balloon_questionMark_gray_png");
                    else
                        this.emoji.texture = RES.getRes("empty_png");
                    break;
                case MissionStatus.SUBMITTABLE:
                    if (toID == this.id)
                        this.emoji.texture = RES.getRes("Balloon_questionMark_png");
                    else
                        this.emoji.texture = RES.getRes("empty_png");
                    break;
                case MissionStatus.UNACCEPTABLE:
                    if (fromID == this.id)
                        this.emoji.texture = RES.getRes("Balloon_exclamation_gray_png");
                    else
                        this.emoji.texture = RES.getRes("empty_png");
                    break;
                default:
                    this.emoji.texture = RES.getRes("empty_png");
            }
        }
        this.emoji.y = -this.emoji.height;
    };
    return NPC_stand;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC_stand,'NPC_stand',["MissionObserver","Observer","Dialogable","Displayable"]);
//# sourceMappingURL=NPC.js.map