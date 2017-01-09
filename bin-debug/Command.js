var WalkCommand = (function () {
    function WalkCommand(x, y) {
        this._hasBeenCancelled = false;
        this.x = x;
        this.y = y;
    }
    var d = __define,c=WalkCommand,p=c.prototype;
    p.execute = function (callback) {
        var service = MAP.MapService.getInstance();
        Player.getInstance().Move(service.gameStateMachine, new Vector2(this.x, this.y), function () {
            callback();
        });
    };
    p.cancel = function (callback) {
        /* GameScene.getCurrentScene().stopMove(function () {
             callback();
         })*/
        Player.getInstance().searchAgent._path.slice(0);
        callback();
    };
    return WalkCommand;
}());
egret.registerClass(WalkCommand,'WalkCommand',["Command"]);
var FightCommand = (function () {
    function FightCommand() {
        /**
         * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
         */
        this._hasBeenCancelled = false;
    }
    var d = __define,c=FightCommand,p=c.prototype;
    p.execute = function (callback) {
        var _this = this;
        //event = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
        var mservice = MonsterService.getInstance();
        var monster = mservice.addMonster();
        var event = egret.Event.create(egret.TouchEvent, "touchTap", true, true);
        event.$initTo(mservice.x + monster.x + monster.width / 2, mservice.y + monster.y + monster.width / 2, 0);
        event.touchDown = false;
        egret.setTimeout(function () {
            monster.dispatchEvent(event); //执行monster上的listener，即monsterService.onTap
        }, this, 200);
        egret.setTimeout(function () {
            if (!_this._hasBeenCancelled) {
                egret.Event.release(event);
                callback();
            }
        }, this, 500);
    };
    p.cancel = function (callback) {
        console.log("脱离战斗");
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100);
    };
    return FightCommand;
}());
egret.registerClass(FightCommand,'FightCommand',["Command"]);
var TalkCommand = (function () {
    function TalkCommand(npcid) {
        this._hasBeenCancelled = false;
        this.npc = MAP.MapService.getInstance().getNPC(npcid);
    }
    var d = __define,c=TalkCommand,p=c.prototype;
    p.execute = function (callback) {
        var _this = this;
        this.npc.showDialog();
        var service = UIService.getInstance();
        var key = egret.setInterval(function () {
            if (service.nextDialog()) {
                _this.npc.isTalking = false;
                callback();
                egret.clearInterval(key);
            }
        }, this, 1000);
    };
    p.cancel = function (callback) {
        console.log("关闭对话框");
    };
    return TalkCommand;
}());
egret.registerClass(TalkCommand,'TalkCommand',["Command"]);
//------------------------------------------------------------------
var CommandList = (function () {
    function CommandList() {
        this._list = [];
        this._frozen = false;
    }
    var d = __define,c=CommandList,p=c.prototype;
    p.addCommand = function (command) {
        this._list.push(command);
    };
    p.cancel = function () {
        var _this = this;
        this._frozen = true;
        var command = this.currentCommand;
        egret.setTimeout(function () {
            if (_this._frozen) {
                _this._frozen = false;
                console.log("时间过长，自动解除frozen");
            }
        }, this, 5000);
        if (command) {
            command.cancel(function () {
                _this._frozen = false;
            });
            this._list = [];
        }
        else {
            this._frozen = false;
            this._list = [];
        }
    };
    p.execute = function () {
        var _this = this;
        if (this._frozen) {
            egret.setTimeout(this.execute, this, 100);
            console.log("frozen");
            return;
        }
        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command);
            command.execute(function () {
                _this.execute();
            });
        }
        else {
        }
    };
    return CommandList;
}());
egret.registerClass(CommandList,'CommandList');
//# sourceMappingURL=Command.js.map