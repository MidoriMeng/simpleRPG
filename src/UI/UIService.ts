class UIService extends egret.DisplayObjectContainer{
    dialog;
    showDialog(){
        this.addChild(this.dialog);
    }
    removeDialog(){
        this.removeChild(this.dialog);
    }
}