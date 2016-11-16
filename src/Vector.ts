const SIZE1 = 1;
const SIZE32 = 32;
const SIZE48 = 48;

class Vector2 {
    private _x: number = 0;
    private _y: number = 0;
    public constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }
    public get x(): number {
        return this._x;
    }
    public set x(x: number) {
        this._x = x;
    }
    public get y(): number {
        return this._y;
    }
    public set y(y: number) {
        this._y = y;
    }
}
//??? static
class Vector2_pixel extends Vector2 {
    _size: number = SIZE1;

    /**传入的是index */
    constructor(ix: number, iy: number) {
        super(ix, iy);
        this.x = ix * this._size;
        this.y = iy * this._size;
    }

    public get indexX(): number {
        return Math.floor(this.x / this._size);
    }
    public set indexX(value: number) {
        this.x = value * this._size;
    }

    public get indexY(): number {
        return Math.floor(this.y / this._size);
    }
    public set indexY(value: number) {
        this.y = value * this._size;
    }

    public get indexPosition(): Vector2 {
        return new Vector2(this.indexX, this.indexY);
    }
    public set indexPosition(vec: Vector2) {
        this.indexX = vec.x;
        this.indexY = vec.y;
    }

    public get position(): Vector2 {
        return new Vector2(this.x, this.y);
    }
    public set position(vec: Vector2) {
        this.x = vec.x;
        this.y = vec.y;
    }
}
class Vector2_p32 extends Vector2_pixel {
    constructor(ix: number, iy: number) {
        super(ix, iy);
        this._size = SIZE32;
        this.x = ix * this._size;
        this.y = iy * this._size;
    }
}
class Vector2_p48 extends Vector2_pixel {
    _size = SIZE48;
    /**输入的是索引 */
    constructor(ix: number, iy: number) {
        super(ix, iy);
        this._size=SIZE48;
        
        this.x = ix * this._size;
        this.y = iy * this._size;
    }
}
