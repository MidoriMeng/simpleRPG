var MAP;
(function (MAP) {
    /**图块的数据结构
     * @param passSpeed
    */
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(data, position) {
            _super.call(this);
            if (position) {
                this.x = position.x;
                this.y = position.y;
            }
            this.texture = RES.getRes(data.texture);
            this.passSpeed = data.speed;
        }
        var d = __define,c=Tile,p=c.prototype;
        d(p, "ix"
            ,function () {
                return this.x / SIZE48;
            }
            ,function (ix) {
                var vec = new Vector2_p48(ix, 0);
                this.x = vec.x;
            }
        );
        d(p, "iy"
            ,function () {
                return this.y / SIZE48;
            }
            ,function (iy) {
                var vec = new Vector2_p48(0, iy);
                this.y = vec.y;
            }
        );
        d(p, "iPosition",undefined
            ,function (vec) {
                this.ix = vec.indexX;
                this.iy = vec.indexY;
            }
        );
        return Tile;
    }(egret.Bitmap));
    MAP.Tile = Tile;
    egret.registerClass(Tile,'MAP.Tile');
    var error = { texture: "error_png", speed: 0 };
    /**生成特定图块 */
    function generateTile(sceneType, type, index) {
        if (index == -1)
            return new Tile(error);
        var result = new Tile(MAP.tileJson[sceneType][type][index]);
        if (result)
            return result;
        else
            return new Tile(error);
    }
    MAP.generateTile = generateTile;
})(MAP || (MAP = {}));
//# sourceMappingURL=TileSettings.js.map