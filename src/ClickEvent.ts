class ClickEvent implements Observer {
    private static instance = new ClickEvent();
    commandList: CommandList;
    //main:Main;

    constructor() {

    }

    static getInstance(): ClickEvent {
        if (ClickEvent.instance == null)
            ClickEvent.instance = new ClickEvent();
        return ClickEvent.instance;
    }

    registerObserver(m: EventEmitter) {
        m.addObserver(this);

    }

    loadCommand(c: CommandList) {
        this.commandList = c;
    }

    onChange(event: egret.TouchEvent) {
        console.log(event.target);
        if (event.target instanceof NPC) {//click NPC
            var npc = event.target as NPC;
            if (!npc.isTalking) {
                this.commandList.cancel();
                this.commandList.addCommand(new WalkCommand(npc.x, npc.y));
                this.commandList.addCommand(new TalkCommand(npc.id));
                this.commandList.execute();
            }
        } else if (event.target instanceof Dialog) {

        }
    }

}