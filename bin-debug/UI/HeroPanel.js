var HeroPanel = (function (_super) {
    __extends(HeroPanel, _super);
    function HeroPanel(hero) {
        _super.call(this);
        this.hero = hero;
        this.bg = new egret.Shape();
        this.bg.graphics.beginFill(0x000000);
        this.bg.graphics.drawRect(0, 0, HeroPanel.DIALOG_WIDTH, HeroPanel.DIALOG_HEIGHT);
        this.bg.graphics.endFill();
        this.bg.alpha = 0.5;
        this.addChild(this.bg);
        var heroName = new egret.TextField();
        heroName.text = this.hero.name;
        heroName.x = HeroPanel.ALIGN;
        heroName.y = HeroPanel.ALIGN;
        this.addChild(heroName);
        var appearance = this.hero;
        appearance.x = HeroPanel.ALIGN;
        appearance.y = HeroPanel.ALIGN * 2 + heroName.size;
        this.addChild(appearance);
        //closePanel
        this.close = new egret.Bitmap(RES.getRes("error_png"));
        this.close.scaleX = 0.63;
        this.close.scaleY = 0.63;
        this.close.x = HeroPanel.DIALOG_WIDTH - this.close.width;
        this.close.touchEnabled = true;
        this.addChild(this.close);
        //show equipments
        var equipY = HeroPanel.ALIGN * 2 + heroName.size;
        this.heroEquips = new Array(equipmentType.length);
        for (var i = 0; i < this.heroEquips.length; i++) {
            var e = this.heroEquips[i];
            if (this.hero.equipment[i])
                e = this.hero.equipment[i];
            else {
                e = new egret.Bitmap(RES.getRes("emptyEquip_png"));
            }
            e.x = HeroPanel.EQUIPX;
            e.y = equipY;
            equipY += (e.height + HeroPanel.ALIGN);
            this.addChild(e);
            e.touchEnabled = true;
            /*e.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt,context)=>{
                this.showEquipment(this.hero.equipment[context],evt);
            },this);*/
            e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDetail, this);
        }
        //show skills
        var skillY = HeroPanel.ALIGN * 2 + heroName.size + appearance.height;
        var skillX = HeroPanel.ALIGN;
        this.heroSkills = new Array();
        for (var i = 0; i < this.hero.skills.length; i++) {
            var skill = this.heroSkills[i];
            if (this.hero.skills[i])
                skill = this.hero.skills[i];
            else {
                skill = new egret.Bitmap(RES.getRes("emptyEquip_png"));
            }
            skill.x = skillX;
            skill.y = skillY;
            skillX += (skill.width + HeroPanel.ALIGN);
            this.addChild(skill);
        }
    }
    var d = __define,c=HeroPanel,p=c.prototype;
    p.showDetail = function (evt) {
        var _this = this;
        evt.target;
        var equipPanel = new DetailPanel(evt.target);
        equipPanel.x = evt.stageX;
        equipPanel.y = evt.stageY;
        this.addChild(equipPanel);
        equipPanel.touchEnabled = true;
        equipPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.removeChild(equipPanel);
        }, this);
    };
    HeroPanel.DIALOG_WIDTH = 251;
    HeroPanel.DIALOG_HEIGHT = 290;
    HeroPanel.ALIGN = 8;
    HeroPanel.EQUIPX = 200;
    return HeroPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(HeroPanel,'HeroPanel');
var DetailPanel = (function (_super) {
    __extends(DetailPanel, _super);
    function DetailPanel(equip) {
        _super.call(this);
        this.obj = equip;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, DetailPanel.WIDTH, DetailPanel.HEIGHT);
        bg.graphics.endFill();
        //bg.alpha = 0.5;
        this.addChild(bg);
        var equipName = new egret.TextField();
        equipName.text = this.obj.name;
        equipName.x = DetailPanel.ALIGN;
        equipName.y = DetailPanel.ALIGN;
        this.addChild(equipName);
        //var appearance = this.equip;
        var appearance = new egret.Bitmap(RES.getRes(this.obj.appearance));
        //var appearance = JSON.parse(JSON.stringify(this.equip));
        appearance.x = DetailPanel.ALIGN;
        appearance.y = DetailPanel.ALIGN * 2 + equipName.size;
        this.addChild(appearance);
        //show properties
        var atk = this.obj.atk;
        var def = this.obj.def;
        var power = this.obj.powerPoint;
        if (atk) {
            var atkp = new egret.TextField;
            atkp.text = "attack + " + atk;
            atkp.x = DetailPanel.ALIGN * 2 + appearance.width;
            atkp.y = DetailPanel.ALIGN * 2 + equipName.size;
            this.addChild(atkp);
        }
        if (def) {
            var defp = new egret.TextField;
            defp.text = "defence + " + def;
            defp.x = DetailPanel.ALIGN * 2 + appearance.width;
            defp.y = DetailPanel.ALIGN * 3 + equipName.size * 2;
            this.addChild(defp);
        }
        if (power) {
            var powp = new egret.TextField;
            powp.text = "power   " + power;
            powp.x = DetailPanel.ALIGN * 2 + appearance.width;
            powp.y = DetailPanel.ALIGN * 4 + equipName.size * 3;
            this.addChild(powp);
        }
    }
    var d = __define,c=DetailPanel,p=c.prototype;
    DetailPanel.WIDTH = 268;
    DetailPanel.HEIGHT = 300;
    DetailPanel.ALIGN = 8;
    return DetailPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DetailPanel,'DetailPanel');
//# sourceMappingURL=HeroPanel.js.map