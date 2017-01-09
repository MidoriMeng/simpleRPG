
let logger = (target: any, name: string, descriptor: PropertyDescriptor) => {
    let delegate = descriptor.value;
    descriptor.value = function () {
        let args: string[] = [];
        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        console.log(`${name} in: ${args.join()}`);
        let result = delegate.apply(this, arguments);
        console.log(`${name} out: ${result}`);
        return result;
    }
    return descriptor;
}

interface PowerPoint {
    powerPoint: number;
}

/**用户，一级 */
class User implements PowerPoint {
    heroes: Hero[] = [];
    private title: Title;

    get heroesInTeam(): Hero[] {
        return this.heroes.filter((value: Hero) => {
            return (value.inParty);
        })
    }

    changeTitle(title: Title) {
        this.title = title;
        if (this.heroes) {
            this.heroes.forEach((value: Hero) => {
                value.title = title;
            });
        }
    }

    get powerPoint(): number {
        var result = 0;
        var heroes = this.heroesInTeam;
        if (heroes) {
            heroes.forEach((value: Hero) => {
                result += value.powerPoint;
            });
        }
        if (this.title)
            result += this.title.powerPoint;
        return result;
    }

}

/**基本数值 */
class GeneralFigures extends egret.Bitmap {
    name: string;
    appearance: string;
    constructor(name: string, appearance: string) {
        super();
        this.name = appearance;
        this.appearance = appearance;
        this.texture = RES.getRes(appearance);
    }
    get atk(): number {
        return 0;
    }
    get def(): number {
        return 0;
    }
    get hp(): number {
        return 0;
    }
    get mp(): number {
        return 0;
    }
    get mag(): number {
        return 0;
    }
}

/**基本装备 */
class GeneralEquip extends GeneralFigures implements PowerPoint{
    level = 0;
    quality = 0;
    constructor(name: string, appearance: string, level = 0, quality: number = 0) {
        super(name, appearance);
        this.level = level;
        this.quality = quality;
    }
    get powerPoint():number {
        return 0;
    }
}

/**称号，二级 */
class Title extends GeneralEquip{
    constructor(name: string, quality = 1) {
        super(name, null, 0, quality);
    }

    get atk(): number {
        return this.quality * 6.5;
    }

    get def(): number {
        return this.quality * 4.5;
    }

    get powerPoint(): number {
        return this.quality * 5;
    }

    show(): string {
        return ` ` +
            ` quality ${this.quality} power ${this.powerPoint}`;
    }
}

/**英雄，二级 */
class Hero extends GeneralEquip{
    inParty = false;
    equipment: Array<Equipment>;
    title: Title;
    skills: Skill[];
    static SKILL_NUMBER = 5;

    constructor(name: string, appearance: string, level = 1, quality = 1) {
        super(name, appearance, level, quality);
        this.title;
        this.inParty = false;
        this.equipment = new Array(equipmentType.length);
        this.skills = new Array(Hero.SKILL_NUMBER);
    }

    @logger
    addEquip(equip: Equipment) {
        this.equipment[equip.type] = equip;
    }

    removeEquip(index: equipmentType) {
        this.equipment[index] = null;
    }

    addSkill(skill: Skill) {
        for (var i = 0; i < this.skills.length; i++) {
            if (!this.skills[i]) {
                this.skills[i] = skill;
                return;
            }
        }
    }

    removeSkill(skill: Skill) {
        var index = this.skills.indexOf(skill);
        this.skills.slice(index, 1);
    }

    get atk(): number {
        var result = 50 * this.quality * this.level;
        this.equipment.forEach((value) => { result += value.def });
        if (this.title)
            result += this.title.def;
        return result;
    }

    get def(): number {
        var result = 50 * this.quality * this.level;
        this.skills.forEach((value) => { result += value.atk; });
        this.equipment.forEach((value) => { result += value.atk });
        if (this.title)
            result += this.title.atk;
        return result;
    }

    get powerPoint(): number {
        var result = 0;
        if (this.equipment) {
            this.equipment.forEach((value) => { result += value.powerPoint });
        }
        if (this.title)
            result += this.title.powerPoint;
        if (this.skills) {
            this.skills.forEach((value) => { result += value.powerPoint });
        }
        return result + this.quality * 28 + this.level * 5;
    }

    show(): string {
        return ` level ${this.level},` +
            ` quality ${this.quality} power ${this.powerPoint}`;
    }
}

enum equipmentType {
    HAT, COAT, PANTS, SHOES, WEAPON, length
}

/**装备，三级 */
class Equipment extends GeneralEquip{
    jewelery: Jewel[] = [];
    type: equipmentType;

    constructor(name: string, type: equipmentType, quality = 1, appearance: string, jewelery?: Jewel[]) {
        super(name, appearance, 0, quality);
        this.type = type;
        if (jewelery)
            this.jewelery = jewelery;
        else
            this.jewelery = [];
    }

    addJewelery(jewelery: Jewel[]) {
        this.jewelery = this.jewelery.concat(jewelery);
    }
    get atk(): number {
        var result = 0;
        if (this.jewelery)
            this.jewelery.forEach((value, index, array) => { result += value.atk; });
        return this.quality * 5.5 + result;
    }

    get def(): number {
        var result = 0;
        if (this.jewelery)
            this.jewelery.forEach((value, index, array) => { result += value.atk; });
        return this.quality * 1.5 + result;
    }

    get powerPoint(): number {
        var result = 0;
        if (this.jewelery)
            this.jewelery.forEach((value: Jewel) => { result += value.powerPoint; });
        return result + this.quality * 5;
    }

    show(): string {
        return ` ` +
            ` quality ${this.quality} power ${this.powerPoint}`;
    }
}

/**宝石，四级 */
class Jewel extends GeneralEquip{
    constructor(name: string, appearance: string, type: equipmentType, quality = 1, level = 1) {
        super(name, appearance, level, quality);
    }

    get atk(): number {
        return this.level * 0.5 + this.quality * 2.4;
    }

    get def(): number {
        return this.level + this.quality * 0.4;
    }

    get powerPoint(): number {
        return this.level * 2 + this.quality * 4;
    }

    show(): string {
        return ` level ${this.level},` +
            ` quality ${this.quality} power ${this.powerPoint}`;
    }
}

/**武将装备的技能，三级 */
class Skill extends GeneralEquip{
    scroll: Scroll;

    constructor(name: string, appearance: string, type: equipmentType, level = 1, scroll?: Scroll) {
        super(name, appearance, level, 0);
        if (scroll)
            this.scroll = scroll;
    }

    levelup(): void {
        this.level++;
    }
    
    get atk(): number {
        var result = 0;
        if (this.scroll)
            result += this.scroll.atk;
        return this.level * 5 + result;
    }
    get powerPoint(): number {
        var result = 0;
        if (this.scroll)
            result += this.scroll.powerPoint;
        return this.level * 8 + result;
    }

    show(): string {
        return ` level ${this.level},` +
            ` power ${this.powerPoint}`;
    }
}

/** 技能装备的秘籍，四级 */
class Scroll extends GeneralEquip{
    constructor(name: string, appearance: string, level = 1) {
        super(name, appearance, level, 0);
    }

    get atk(): number {
        return this.level * this.quality * 1.2;
    }

    get def(): number {
        return this.level * this.quality * 0.3;
    }
    get powerPoint(): number {
        return this.level * 2 + this.quality * 5;
    }

    show(): string {
        return ` level ${this.level},` +
            ` quality ${this.quality} power ${this.powerPoint}`;
    }
}

var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    const getter = desc.get;
    desc.get = function () {
        console.log("wow");
        return getter.apply(this);
    }
    return desc;
}



