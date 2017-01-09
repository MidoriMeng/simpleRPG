
class NPC extends egret.DisplayObjectContainer implements MissionObserver, Dialogable, Displayable {
    id: string;//三位
    name: string;

    appearances: appearance_4;
    appearance: egret.Bitmap;
    orientation: DIRECTION;

    portrait: egret.Bitmap;
    missionList: Mission[] = [];
    emoji: egret.Bitmap;

    isTalking = false;

    /**ID为三位 */
    constructor(id: string, name: string,
        appearances: appearance_4, orientation: DIRECTION,
        portrait: string) {
        super();
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
        this.addChild(this.emoji);

        //add listener
        //this.addListener();
        this.addChild(this.appearance);
        //this.appearance.touchEnabled = true;
    }

    setPosition(pos: Vector2) {
        this.x = pos.x;
        this.y = pos.y;
    }

    /**更新orientation和appearance */
    changeOrientation(direction: DIRECTION) {
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
    }

    conversation() {
        Player.getInstance().Move(machine, new Vector2(this.x, this.y), this.showDialog);

    }
    /*addListener() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDialog, this);
    }*/

    showDialog() {
        UIService.getInstance().displayDialog(new Dialog(this, this.missionList[0].description, this.missionList[0], this.id));
        //this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showDialog, this);
    }

    static rule(rule: "interactableFirst" | "all", missions: missionList, self: NPC) {
        var all = () => {
            for (var index in missions) {
                //var pattern = new RegExp(this.id, "\d{3}");
                var fromId = missions[index].getFromID();
                var toId = missions[index].getToID();
                if (self.id == fromId || self.id == toId) {
                    self.missionList.push(missions[index]);
                }
            }
        }
        var interactableFirst = () => {
            self.rule_all(missions, self);
            self.sort();
        }
        switch (rule) {
            case "interactableFirst":
                interactableFirst();
                break;
            case "all":
                all();
                break;
        }
    }
    /**把所有收/发人是自己的任务加到自己的队列中 */
    rule_all(missions: missionList, self: NPC) {
        for (var index in missions) {
            //var pattern = new RegExp(this.id, "\d{3}");
            var fromId = missions[index].getFromID();
            var toId = missions[index].getToID();
            if (self.id == fromId || self.id == toId) {
                self.missionList.push(missions[index]);
            }
        }
    }

    rule_all_interactableFirst(missions: missionList, self: NPC) {
        self.rule_all(missions, self);
        self.sort();
    }

    onChange(mission: Mission) {
        if (mission.getFromID() == this.id || mission.getToID() == this.id) {
            this.missionList[mission.id] = mission;
            this.sort();
            this.showEmoji();
        }

    }

    sort() {
        var id = this.id;
        this.missionList.sort(function (a, b) {
            var valueA, valueB;
            valueB = (
                !b.status
                    || (!(b.status % 2) && b.getFromID() == id)
                    || (b.status % 2 && b.getToID() == id) ?
                    0 : b.status
            )
            valueA = (
                !a.status
                    || (!(a.status % 2) && a.getFromID() == id)
                    || (a.status % 2 && a.getToID() == id) ?
                    0 : a.status
            )
            return valueB - valueA;
        });
    }

    showEmoji() {
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
    }
}
