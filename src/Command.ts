interface Command {
    _hasBeenCancelled: boolean;
    execute(callback: Function): void;

    cancel(callback: Function): void;

}

class WalkCommand implements Command {
    private x;
    private y;
    _hasBeenCancelled = false;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    execute(callback: Function): void {
        var service = MAP.MapService.getInstance();

        Player.getInstance().Move(service.gameStateMachine, new Vector2(this.x, this.y), () => {
            callback();
        });
    }

    cancel(callback: Function) {
        /* GameScene.getCurrentScene().stopMove(function () {
             callback();
         })*/
         Player.getInstance().searchAgent._path.slice(0);
         callback();
    }
}

class FightCommand implements Command {
    /**
     * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
     */
    _hasBeenCancelled = false;

    execute(callback: Function): void {
        //event = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
        var mservice = MonsterService.getInstance();
        var monster = mservice.addMonster();
        var event = egret.Event.create(egret.TouchEvent, "touchTap", true, true);
        event.$initTo(mservice.x + monster.x + monster.width / 2,
            mservice.y + monster.y + monster.width / 2, 0);
        event.touchDown = false;
        egret.setTimeout(() => {
            monster.dispatchEvent(event);//执行monster上的listener，即monsterService.onTap
        }, this, 200);

        egret.setTimeout(() => {
            if (!this._hasBeenCancelled) {
                egret.Event.release(event);
                callback();
            }
        }, this, 500);

    }

    cancel(callback: Function) {
        console.log("脱离战斗")
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100)

    }
}

class TalkCommand implements Command {
    _hasBeenCancelled = false;
    npc: NPC;

    constructor(npcid: string) {
        this.npc = MAP.MapService.getInstance().getNPC(npcid);
    }

    execute(callback: Function): void {
        this.npc.showDialog();
        var service = UIService.getInstance();
        var key = egret.setInterval(()=> {
            if(service.nextDialog()){
                this.npc.isTalking = false;
                callback();
                egret.clearInterval(key);
            }
        },this, 1000);
    }

    cancel(callback: Function) {
        console.log("关闭对话框");
    }
}

//------------------------------------------------------------------

class CommandList {
    private _list: Command[] = [];
    private currentCommand: Command;
    private _frozen = false;

    addCommand(command: Command) {
        this._list.push(command);
    }

    cancel() {
        this._frozen = true;
        var command = this.currentCommand;
        egret.setTimeout(() => {
            if (this._frozen) {
                this._frozen = false;
                console.log("时间过长，自动解除frozen");
            }

        }, this, 5000);
        if (command) {
            command.cancel(() => {
                this._frozen = false;
            });
            this._list = [];
        } else {
            this._frozen = false;
            this._list = [];
        }

    }

    execute() {
        if (this._frozen) {
            egret.setTimeout(this.execute, this, 100);
            console.log("frozen");
            return;
        }

        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command);
            command.execute(() => {
                this.execute()
            })

        }
        else {
            //console.log("全部命令执行完毕")
        }
    }

}
