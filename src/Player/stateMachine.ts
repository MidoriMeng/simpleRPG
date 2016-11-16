namespace PLAYER {
    export interface PlayerState extends State {
        context: Player;
        onRun(pass: number);
        onCheck(): PlayerState;
        name: string;
    }


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

    export class IdleState implements PlayerState {
        context: Player;
        name = "Idle";
        public constructor(player: Player) {
            this.context = player;
            this.context.curState = this;
        }

        public onInit() {
            //console.log("idle init, at" + this.context.x + "  " + this.context.y);

        }

        public onRun(pass: number) {
            //console.log("idle onRun");
            //this.context.curAnimation.playCurcularly(pass);
        }

        public onCheck(): PlayerState {
            if (this.context.searchAgent._path.length)
                return new WalkState(this.context);
            return this;
        }

        public onExit() {
            //console.log("idle exit");
        }
    }
    export class WalkState implements PlayerState {
        context: Player;
        targetPosition: Vector2;
        name = "Walk";
        public constructor(player: Player) {
            this.context = player;
            this.context.curState = this;
            this.targetPosition = new Vector2(player.x, player.y);
            //console.log("facing left:"+this.player.isLeftFacing);
        }

        //TODO:根据tileNode path生成动作

        public onInit() {
            //获取路径第一个点作为移动目标
            var temp = this.context.searchAgent._path.pop();//获取并删除路径第一个节点
            if (temp) {
                this.targetPosition = new Vector2_p48(temp.x, temp.y);
                //修改动画
                this.context.updateOrientation(this.targetPosition);
                this.context.updateWalkAnimationClip();
                //播放动画、人物缓动
                var funcChange = function (): void {
                    //console.log(this.x);
                }
                var tween = egret.Tween.get(this.context, { onChange: funcChange, onChangeObj: this.context });

                tween.to({
                    x: this.targetPosition.x,
                    y: this.targetPosition.y
                }, ((
                    Math.abs(this.targetPosition.x - this.context.x) +
                    Math.abs(this.targetPosition.y - this.context.y)) /
                    this.context.velocity));
            }
        }


        public onRun(pass: number) {
            //console.log("walk onRun");
            this.context.curAnimation.playCurcularly(pass);
        }

        public onCheck(): PlayerState {
            //console.log("walk onCheck");
            if (/*!this.context.searchAgent._path.length
                && */this.context.x == this.targetPosition.x
                && this.context.y == this.targetPosition.y) {
                return new IdleState(this.context);
            } else {
                return this;
            }
        }

        public onExit() {
            //console.log("walk exit");
            egret.Tween.removeTweens(this.context);
        }
    }

    /*
    class AttackState implements State {
        player: Player;
        public constructor(player: Player) {
            this.player = player;
        }
    
        public onInit() {
            //idle init
        }
    
        public onRun(pass: number) {
            //TODO:find enemy
        }
    
        public onCheck(): State {
            if (this.player.hp < 50) {
                return new IdleState(this.player);
            }
        }
    
        public onExit() {
            //idle exit
        }
    }
    */
}
