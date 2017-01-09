var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        _super.call(this);
        this.name = "slime";
        this.status = MonsterStatus.ALIVE;
        this.appearance = new egret.Bitmap(RES.getRes("Slime_png"));
        this.addChild(this.appearance);
        this.touchEnabled = true;
    }
    var d = __define,c=Monster,p=c.prototype;
    p.goDie = function () {
        console.log(this.name + " die");
        this.status = MonsterStatus.DEAD;
    };
    return Monster;
}(egret.DisplayObjectContainer));
egret.registerClass(Monster,'Monster');
var MonsterStatus;
(function (MonsterStatus) {
    MonsterStatus[MonsterStatus["ALIVE"] = 0] = "ALIVE";
    MonsterStatus[MonsterStatus["DEAD"] = 1] = "DEAD";
})(MonsterStatus || (MonsterStatus = {}));
var MonsterService = (function (_super) {
    __extends(MonsterService, _super);
    function MonsterService() {
        _super.call(this);
        this.observerList = new Array();
        this.monsterList = new Array();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    }
    var d = __define,c=MonsterService,p=c.prototype;
    MonsterService.getInstance = function () {
        if (MonsterService.instance == null)
            MonsterService.instance = new MonsterService();
        return MonsterService.instance;
    };
    p.onTap = function (e) {
        var _this = this;
        console.log("tap @ monsterService");
        var monster = e.target;
        //animation
        var slash = new egret.Bitmap(RES.getRes("Slash_png"));
        slash.x = monster.x + e.localX - slash.width / 2;
        slash.y = monster.y + e.localY - slash.height / 2;
        //console.log(slash.x, slash.y);
        this.addChild(slash);
        egret.setTimeout(function () {
            _this.removeChild(slash);
            //kill
            _this.killMonster(monster);
        }, this, 200);
    };
    p.killMonster = function (monster) {
        monster.goDie();
        this.monsterList.splice(this.monsterList.indexOf(monster), 1);
        this.removeChild(monster);
        this.notify(monster);
    };
    p.loadMonsters = function () {
        /*this.monsterList.push(new Monster());
        this.addChild(this.monsterList[0]);
        this.updateView();*/
    };
    p.addMonster = function () {
        console.log("new monster");
        var m = new Monster();
        this.monsterList.push(m);
        this.addChild(m);
        m.x = Math.random() * 105;
        m.y = Math.random() * 45;
        this.updateView();
        return m;
    };
    p.addObserver = function (o) {
        this.observerList.push(o);
    };
    p.notify = function (monster) {
        for (var index in this.observerList)
            this.observerList[index].onChange(monster);
    };
    p.updateView = function () {
    };
    return MonsterService;
}(egret.DisplayObjectContainer));
egret.registerClass(MonsterService,'MonsterService',["EventEmitter"]);
//# sourceMappingURL=MonsterService.js.map