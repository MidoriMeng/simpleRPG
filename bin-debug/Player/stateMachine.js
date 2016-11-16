var PLAYER;
(function (PLAYER) {
    /*class PlayerStateMachine extends StateMachine {
        curState: PlayerState;
        //context: any;
        time = 0;
        constructor(firstState: PlayerState) {
            super(firstState);
        }
        public runMachine(timeStamp: number): boolean {
            var now = timeStamp;
            let time = this.time;
            let pass = now - time;
            this.time = now;
            this.curState.onRun(pass);
            var newState: PlayerState = this.curState.onCheck();
            if (newState != this.curState) {
                // console.log("switch to new state");
                this.curState.onExit();
                this.curState = newState;
                this.curState.onInit();
            }
            return false;
        }
        public switchState(target: PlayerState) {
            this.curState.onExit();
            target.onInit();
            this.curState = target;
        }
    }*/
    var IdleState = (function () {
        function IdleState(player) {
            this.name = "Idle";
            this.context = player;
            this.context.curState = this;
        }
        var d = __define,c=IdleState,p=c.prototype;
        p.onInit = function () {
            //console.log("idle init, at" + this.context.x + "  " + this.context.y);
        };
        p.onRun = function (pass) {
            //console.log("idle onRun");
            //this.context.curAnimation.playCurcularly(pass);
        };
        p.onCheck = function () {
            if (this.context.searchAgent._path.length)
                return new WalkState(this.context);
            return this;
        };
        p.onExit = function () {
            //console.log("idle exit");
        };
        return IdleState;
    }());
    PLAYER.IdleState = IdleState;
    egret.registerClass(IdleState,'PLAYER.IdleState',["PLAYER.PlayerState","State"]);
    var WalkState = (function () {
        function WalkState(player) {
            this.name = "Walk";
            this.context = player;
            this.context.curState = this;
            this.targetPosition = new Vector2(player.x, player.y);
            //console.log("facing left:"+this.player.isLeftFacing);
        }
        var d = __define,c=WalkState,p=c.prototype;
        //TODO:根据tileNode path生成动作
        p.onInit = function () {
            //获取路径第一个点作为移动目标
            var temp = this.context.searchAgent._path.pop(); //获取并删除路径第一个节点
            if (temp) {
                this.targetPosition = new Vector2_p48(temp.x, temp.y);
                //修改动画
                this.context.updateOrientation(this.targetPosition);
                this.context.updateWalkAnimationClip();
                //播放动画、人物缓动
                var funcChange = function () {
                    //console.log(this.x);
                };
                var tween = egret.Tween.get(this.context, { onChange: funcChange, onChangeObj: this.context });
                tween.to({
                    x: this.targetPosition.x,
                    y: this.targetPosition.y
                }, ((Math.abs(this.targetPosition.x - this.context.x) +
                    Math.abs(this.targetPosition.y - this.context.y)) /
                    this.context.velocity));
            }
        };
        p.onRun = function (pass) {
            //console.log("walk onRun");
            this.context.curAnimation.playCurcularly(pass);
        };
        p.onCheck = function () {
            //console.log("walk onCheck");
            if (this.context.x == this.targetPosition.x
                && this.context.y == this.targetPosition.y) {
                return new IdleState(this.context);
            }
            else {
                return this;
            }
        };
        p.onExit = function () {
            //console.log("walk exit");
            egret.Tween.removeTweens(this.context);
        };
        return WalkState;
    }());
    PLAYER.WalkState = WalkState;
    egret.registerClass(WalkState,'PLAYER.WalkState',["PLAYER.PlayerState","State"]);
})(PLAYER || (PLAYER = {}));
//# sourceMappingURL=stateMachine.js.map