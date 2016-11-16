namespace MAP {
    //???依赖：tomorrow；requirejs
    //???export
    //???png
    //:指法，鼠标
    //
    export const enum SCENE_TYPE {
        outside
    }
    export const enum TILE_TYPE {
        bg,
        obj
    }

    /**图块的数据结构 
     * @param passSpeed
    */
    export class Tile extends egret.Bitmap {
        /**
         * 通行速度系数
         * 1代表正常通过，0代表不能通过
         */
        passSpeed: number;
        constructor(data: { texture: string, speed: number }, position?: Vector2_p48) {
            super();
            if (position) {
                this.x = position.x;
                this.y = position.y;
            }
            this.texture = RES.getRes(data.texture);
            this.passSpeed = data.speed;
        }

        public set ix(ix: number) {
            var vec = new Vector2_p48(ix, 0);
            this.x = vec.x;
        }
        public set iy(iy: number) {
            var vec = new Vector2_p48(0, iy);
            this.y = vec.y;
        }
        public set iPosition(vec: Vector2_p48) {
            this.ix = vec.indexX;
            this.iy = vec.indexY;
        }
        public get ix(): number {
            return this.x / SIZE48;
        }
        public get iy(): number {
            return this.y / SIZE48;
        }
    }

    var error = { texture: "error_png", speed: 0 };

    /**生成特定图块 */
    export function generateTile(sceneType: SCENE_TYPE, type: TILE_TYPE, index: number): Tile {
        if (index == -1)
            return new Tile(error);
        var result = new Tile(tileJson[sceneType][type][index]);
        if (result)
            return result;
        else
            return new Tile(error);

    }
}