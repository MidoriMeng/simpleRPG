var Animation = (function () {
    function Animation(anim, self, FPS) {
        if (FPS === void 0) { FPS = 24; }
        this.FPS = 24;
        this.textureList = [];
        this.textureList = anim;
        this.self = self;
        this.FPS = FPS;
        this.timePassed = 0;
        this.curFrame = 0;
        //    console.log("new animation,"+anim[0]);
    }
    var d = __define,c=Animation,p=c.prototype;
    p.playCurcularly = function (timePassed) {
        this.timePassed += timePassed;
        if (this.timePassed >= 1000 / this.FPS) {
            this.timePassed -= (1000 / this.FPS);
            this.curFrame = (++this.curFrame) % this.textureList.length;
            this.self.texture = RES.getRes(this.textureList[this.curFrame]);
        }
    };
    p.playOnce = function (order, timePassed) {
        this.timePassed += timePassed;
        if (this.timePassed >= 1000 / this.FPS) {
            this.timePassed -= (1000 / this.FPS);
            var list = this.textureList[order];
            if (this.curFrame < list.length) {
                this.self.texture = RES.getRes(list[this.curFrame]);
                this.curFrame++;
            }
        }
    };
    return Animation;
}());
egret.registerClass(Animation,'Animation');
//# sourceMappingURL=Animation.js.map