/*
class StateMachine {
    curState: State;
    constructor(firstState: State) {
        this.curState = firstState;
        this.curState.onInit();
    }
    public runMachine(...a): boolean {
        this.curState.onRun();
        var newState: State = this.curState.onCheck();
        if (newState != this.curState) {
            // console.log("switch to new state");
            this.curState.onExit();
            this.curState = newState;
            this.curState.onInit();
        }
        return false;
    }
    public switchState(target: State) {
        this.curState.onExit();
        target.onInit();
        this.curState = target;
    }
}*/
var GameStateMachine = (function () {
    function GameStateMachine() {
        this.stateList = [];
        this.time = 0;
        this.iI = 0;
        //initialize all state machines
        //this.stateLists[0] =
        //this.curState.onInit();
    }
    var d = __define,c=GameStateMachine,p=c.prototype;
    p.addState = function (state) {
        this.stateList[this.stateList.length] = state;
        state.onInit();
    };
    p.runMachine = function (timeStamp) {
        var now = timeStamp;
        var time = this.time;
        var pass = now - time;
        this.time = now;
        this.iI++; //test
        if (this.stateList) {
            for (var index in this.stateList) {
                this.stateList[index].onRun(pass);
                var newState = this.stateList[index].onCheck();
                if (newState != this.stateList[index]) {
                    // console.log("switch to new state");
                    this.stateList[index].onExit();
                    this.stateList[index] = newState;
                    this.stateList[index].onInit();
                }
            }
        }
        return false;
    };
    p.switchState = function (current, target) {
        //console.log("switch state");
        for (var index in this.stateList) {
            if (this.stateList[index] == current) {
                this.stateList[index].onExit();
                target.onInit();
                this.stateList[index] = target;
            }
        }
    };
    return GameStateMachine;
}());
egret.registerClass(GameStateMachine,'GameStateMachine');
//# sourceMappingURL=FSM.js.map