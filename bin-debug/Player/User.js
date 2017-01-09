var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var logger = function (target, name, descriptor) {
    var delegate = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        console.log(name + " in: " + args.join());
        var result = delegate.apply(this, arguments);
        console.log(name + " out: " + result);
        return result;
    };
    return descriptor;
};
/**用户，一级 */
var User = (function () {
    function User() {
        this.heroes = [];
    }
    var d = __define,c=User,p=c.prototype;
    d(p, "heroesInTeam"
        ,function () {
            return this.heroes.filter(function (value) {
                return (value.inParty);
            });
        }
    );
    p.changeTitle = function (title) {
        this.title = title;
        if (this.heroes) {
            this.heroes.forEach(function (value) {
                value.title = title;
            });
        }
    };
    d(p, "powerPoint"
        ,function () {
            var result = 0;
            var heroes = this.heroesInTeam;
            if (heroes) {
                heroes.forEach(function (value) {
                    result += value.powerPoint;
                });
            }
            if (this.title)
                result += this.title.powerPoint;
            return result;
        }
    );
    return User;
}());
egret.registerClass(User,'User',["PowerPoint"]);
/**基本数值 */
var GeneralFigures = (function (_super) {
    __extends(GeneralFigures, _super);
    function GeneralFigures(name, appearance) {
        _super.call(this);
        this.name = appearance;
        this.appearance = appearance;
        this.texture = RES.getRes(appearance);
    }
    var d = __define,c=GeneralFigures,p=c.prototype;
    d(p, "atk"
        ,function () {
            return 0;
        }
    );
    d(p, "def"
        ,function () {
            return 0;
        }
    );
    d(p, "hp"
        ,function () {
            return 0;
        }
    );
    d(p, "mp"
        ,function () {
            return 0;
        }
    );
    d(p, "mag"
        ,function () {
            return 0;
        }
    );
    return GeneralFigures;
}(egret.Bitmap));
egret.registerClass(GeneralFigures,'GeneralFigures');
/**基本装备 */
var GeneralEquip = (function (_super) {
    __extends(GeneralEquip, _super);
    function GeneralEquip(name, appearance, level, quality) {
        if (level === void 0) { level = 0; }
        if (quality === void 0) { quality = 0; }
        _super.call(this, name, appearance);
        this.level = 0;
        this.quality = 0;
        this.level = level;
        this.quality = quality;
    }
    var d = __define,c=GeneralEquip,p=c.prototype;
    d(p, "powerPoint"
        ,function () {
            return 0;
        }
    );
    return GeneralEquip;
}(GeneralFigures));
egret.registerClass(GeneralEquip,'GeneralEquip',["PowerPoint"]);
/**称号，二级 */
var Title = (function (_super) {
    __extends(Title, _super);
    function Title(name, quality) {
        if (quality === void 0) { quality = 1; }
        _super.call(this, name, null, 0, quality);
    }
    var d = __define,c=Title,p=c.prototype;
    d(p, "atk"
        ,function () {
            return this.quality * 6.5;
        }
    );
    d(p, "def"
        ,function () {
            return this.quality * 4.5;
        }
    );
    d(p, "powerPoint"
        ,function () {
            return this.quality * 5;
        }
    );
    p.show = function () {
        return " " +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    return Title;
}(GeneralEquip));
egret.registerClass(Title,'Title');
/**英雄，二级 */
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(name, appearance, level, quality) {
        if (level === void 0) { level = 1; }
        if (quality === void 0) { quality = 1; }
        _super.call(this, name, appearance, level, quality);
        this.inParty = false;
        this.title;
        this.inParty = false;
        this.equipment = new Array(equipmentType.length);
        this.skills = new Array(Hero.SKILL_NUMBER);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.addEquip = function (equip) {
        this.equipment[equip.type] = equip;
    };
    p.removeEquip = function (index) {
        this.equipment[index] = null;
    };
    p.addSkill = function (skill) {
        for (var i = 0; i < this.skills.length; i++) {
            if (!this.skills[i]) {
                this.skills[i] = skill;
                return;
            }
        }
    };
    p.removeSkill = function (skill) {
        var index = this.skills.indexOf(skill);
        this.skills.slice(index, 1);
    };
    d(p, "atk"
        ,function () {
            var result = 50 * this.quality * this.level;
            this.equipment.forEach(function (value) { result += value.def; });
            if (this.title)
                result += this.title.def;
            return result;
        }
    );
    d(p, "def"
        ,function () {
            var result = 50 * this.quality * this.level;
            this.skills.forEach(function (value) { result += value.atk; });
            this.equipment.forEach(function (value) { result += value.atk; });
            if (this.title)
                result += this.title.atk;
            return result;
        }
    );
    d(p, "powerPoint"
        ,function () {
            var result = 0;
            if (this.equipment) {
                this.equipment.forEach(function (value) { result += value.powerPoint; });
            }
            if (this.title)
                result += this.title.powerPoint;
            if (this.skills) {
                this.skills.forEach(function (value) { result += value.powerPoint; });
            }
            return result + this.quality * 28 + this.level * 5;
        }
    );
    p.show = function () {
        return (" level " + this.level + ",") +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    Hero.SKILL_NUMBER = 5;
    __decorate([
        logger
    ], p, "addEquip", null);
    return Hero;
}(GeneralEquip));
egret.registerClass(Hero,'Hero');
var equipmentType;
(function (equipmentType) {
    equipmentType[equipmentType["HAT"] = 0] = "HAT";
    equipmentType[equipmentType["COAT"] = 1] = "COAT";
    equipmentType[equipmentType["PANTS"] = 2] = "PANTS";
    equipmentType[equipmentType["SHOES"] = 3] = "SHOES";
    equipmentType[equipmentType["WEAPON"] = 4] = "WEAPON";
    equipmentType[equipmentType["length"] = 5] = "length";
})(equipmentType || (equipmentType = {}));
/**装备，三级 */
var Equipment = (function (_super) {
    __extends(Equipment, _super);
    function Equipment(name, type, quality, appearance, jewelery) {
        if (quality === void 0) { quality = 1; }
        _super.call(this, name, appearance, 0, quality);
        this.jewelery = [];
        this.type = type;
        if (jewelery)
            this.jewelery = jewelery;
        else
            this.jewelery = [];
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.addJewelery = function (jewelery) {
        this.jewelery = this.jewelery.concat(jewelery);
    };
    d(p, "atk"
        ,function () {
            var result = 0;
            if (this.jewelery)
                this.jewelery.forEach(function (value, index, array) { result += value.atk; });
            return this.quality * 5.5 + result;
        }
    );
    d(p, "def"
        ,function () {
            var result = 0;
            if (this.jewelery)
                this.jewelery.forEach(function (value, index, array) { result += value.atk; });
            return this.quality * 1.5 + result;
        }
    );
    d(p, "powerPoint"
        ,function () {
            var result = 0;
            if (this.jewelery)
                this.jewelery.forEach(function (value) { result += value.powerPoint; });
            return result + this.quality * 5;
        }
    );
    p.show = function () {
        return " " +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    return Equipment;
}(GeneralEquip));
egret.registerClass(Equipment,'Equipment');
/**宝石，四级 */
var Jewel = (function (_super) {
    __extends(Jewel, _super);
    function Jewel(name, appearance, type, quality, level) {
        if (quality === void 0) { quality = 1; }
        if (level === void 0) { level = 1; }
        _super.call(this, name, appearance, level, quality);
    }
    var d = __define,c=Jewel,p=c.prototype;
    d(p, "atk"
        ,function () {
            return this.level * 0.5 + this.quality * 2.4;
        }
    );
    d(p, "def"
        ,function () {
            return this.level + this.quality * 0.4;
        }
    );
    d(p, "powerPoint"
        ,function () {
            return this.level * 2 + this.quality * 4;
        }
    );
    p.show = function () {
        return (" level " + this.level + ",") +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    return Jewel;
}(GeneralEquip));
egret.registerClass(Jewel,'Jewel');
/**武将装备的技能，三级 */
var Skill = (function (_super) {
    __extends(Skill, _super);
    function Skill(name, appearance, type, level, scroll) {
        if (level === void 0) { level = 1; }
        _super.call(this, name, appearance, level, 0);
        if (scroll)
            this.scroll = scroll;
    }
    var d = __define,c=Skill,p=c.prototype;
    p.levelup = function () {
        this.level++;
    };
    d(p, "atk"
        ,function () {
            var result = 0;
            if (this.scroll)
                result += this.scroll.atk;
            return this.level * 5 + result;
        }
    );
    d(p, "powerPoint"
        ,function () {
            var result = 0;
            if (this.scroll)
                result += this.scroll.powerPoint;
            return this.level * 8 + result;
        }
    );
    p.show = function () {
        return (" level " + this.level + ",") +
            (" power " + this.powerPoint);
    };
    return Skill;
}(GeneralEquip));
egret.registerClass(Skill,'Skill');
/** 技能装备的秘籍，四级 */
var Scroll = (function (_super) {
    __extends(Scroll, _super);
    function Scroll(name, appearance, level) {
        if (level === void 0) { level = 1; }
        _super.call(this, name, appearance, level, 0);
    }
    var d = __define,c=Scroll,p=c.prototype;
    d(p, "atk"
        ,function () {
            return this.level * this.quality * 1.2;
        }
    );
    d(p, "def"
        ,function () {
            return this.level * this.quality * 0.3;
        }
    );
    d(p, "powerPoint"
        ,function () {
            return this.level * 2 + this.quality * 5;
        }
    );
    p.show = function () {
        return (" level " + this.level + ",") +
            (" quality " + this.quality + " power " + this.powerPoint);
    };
    return Scroll;
}(GeneralEquip));
egret.registerClass(Scroll,'Scroll');
var Cache = function (target, propertyName, desc) {
    var getter = desc.get;
    desc.get = function () {
        console.log("wow");
        return getter.apply(this);
    };
    return desc;
};
//# sourceMappingURL=User.js.map