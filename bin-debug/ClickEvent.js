var ClickEvent = (function () {
    //main:Main;
    function ClickEvent() {
    }
    var d = __define,c=ClickEvent,p=c.prototype;
    ClickEvent.getInstance = function () {
        if (ClickEvent.instance == null)
            ClickEvent.instance = new ClickEvent();
        return ClickEvent.instance;
    };
    p.registerObserver = function (m) {
        m.addObserver(this);
    };
    p.loadCommand = function (c) {
        this.commandList = c;
    };
    p.onChange = function (event) {
        console.log(event.target);
        if (event.target instanceof NPC) {
            var npc = event.target;
            if (!npc.isTalking) {
                this.commandList.cancel();
                this.commandList.addCommand(new WalkCommand(npc.x, npc.y));
                this.commandList.addCommand(new TalkCommand(npc.id));
                this.commandList.execute();
            }
        }
        else if (event.target instanceof Dialog) {
        }
    };
    ClickEvent.instance = new ClickEvent();
    return ClickEvent;
}());
egret.registerClass(ClickEvent,'ClickEvent',["Observer"]);
//# sourceMappingURL=ClickEvent.js.map