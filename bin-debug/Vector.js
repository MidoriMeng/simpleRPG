var SIZE1 = 1;
var SIZE32 = 32;
var SIZE48 = 48;
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = 0;
        this._y = 0;
        this._x = x;
        this._y = y;
    }
    var d = __define,c=Vector2,p=c.prototype;
    d(p, "x"
        ,function () {
            return this._x;
        }
        ,function (x) {
            this._x = x;
        }
    );
    d(p, "y"
        ,function () {
            return this._y;
        }
        ,function (y) {
            this._y = y;
        }
    );
    return Vector2;
}());
egret.registerClass(Vector2,'Vector2');
//??? static
var Vector2_pixel = (function (_super) {
    __extends(Vector2_pixel, _super);
    /**传入的是index */
    function Vector2_pixel(ix, iy) {
        _super.call(this, ix, iy);
        this._size = SIZE1;
        this.x = ix * this._size;
        this.y = iy * this._size;
    }
    var d = __define,c=Vector2_pixel,p=c.prototype;
    d(p, "indexX"
        ,function () {
            return Math.floor(this.x / this._size);
        }
        ,function (value) {
            this.x = value * this._size;
        }
    );
    d(p, "indexY"
        ,function () {
            return Math.floor(this.y / this._size);
        }
        ,function (value) {
            this.y = value * this._size;
        }
    );
    d(p, "indexPosition"
        ,function () {
            return new Vector2(this.indexX, this.indexY);
        }
        ,function (vec) {
            this.indexX = vec.x;
            this.indexY = vec.y;
        }
    );
    d(p, "position"
        ,function () {
            return new Vector2(this.x, this.y);
        }
        ,function (vec) {
            this.x = vec.x;
            this.y = vec.y;
        }
    );
    return Vector2_pixel;
}(Vector2));
egret.registerClass(Vector2_pixel,'Vector2_pixel');
var Vector2_p32 = (function (_super) {
    __extends(Vector2_p32, _super);
    function Vector2_p32(ix, iy) {
        _super.call(this, ix, iy);
        this._size = SIZE32;
        this.x = ix * this._size;
        this.y = iy * this._size;
    }
    var d = __define,c=Vector2_p32,p=c.prototype;
    return Vector2_p32;
}(Vector2_pixel));
egret.registerClass(Vector2_p32,'Vector2_p32');
var Vector2_p48 = (function (_super) {
    __extends(Vector2_p48, _super);
    /**输入的是索引 */
    function Vector2_p48(ix, iy) {
        _super.call(this, ix, iy);
        this._size = SIZE48;
        this._size = SIZE48;
        this.x = ix * this._size;
        this.y = iy * this._size;
    }
    var d = __define,c=Vector2_p48,p=c.prototype;
    return Vector2_p48;
}(Vector2_pixel));
egret.registerClass(Vector2_p48,'Vector2_p48');
//# sourceMappingURL=Vector.js.map