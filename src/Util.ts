/**
* 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
* Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
*/

interface Observer{
        onChange(...a);
}


//???继承的时候，变量的类型会改变，如何覆盖？引入抽象类？
/*
interface StateMachine {
        curState: any;
        context: any;
        constructor(firstState: any) {
        this.curState = firstState;
        this.curState.onInit();
}*/
/*
    public runMachine(timeStamp:number):boolean {
        
        var now = timeStamp;
        let time = this.time;
        let pass = now - time;
        this.time = now;
        this.curState.onRun(pass);
        var newState: PlayerState = this.curState.onCheck();
        if (newState != this.curState) {
                console.log("switch to new state");
                this.curState.onExit();
                this.curState = newState;
                this.curState.onInit();
        }
        return false;
}
    public switchState(target:PlayerState){
        this.curState.onExit();
        target.onInit();
        this.curState = target;
}
}

*/
