
namespace MAP {

    interface ITileMap {
        type: SCENE_TYPE;
        background: number[][];
        objects: number[][];
        npcList?: any;
    }

    export class Map extends egret.DisplayObjectContainer {
        type: SCENE_TYPE;
        bgTiles: Tile[][] = [[]];
        objTiles: Tile[][] = [[]];

        objGrid: Grid;
        creatureGrid: Grid;
        npcList: NPC[];
        constructor(data: ITileMap, npcs: NPC[]) {
            super();
            this.objGrid = new Grid();
            this.type = data.type;
            //读取背景
            for (var i = 0; i < data.background.length; i++) {
                this.bgTiles[i] = [];
                for (var j = 0; j < data.background[0].length; j++) {
                    //initialize tile
                    this.bgTiles[i][j] = generateTile(this.type, TILE_TYPE.bg, data.background[i][j]);
                    //initialize position
                    this.bgTiles[i][j].iPosition = new Vector2_p48(i, j);
                    this.addChild(this.bgTiles[i][j]);
                }
            }
            //读取物品
            this.objGrid._numCols = data.background.length;
            this.objGrid._numRows = data.background[0].length;
            for (var i = 0; i < data.background.length; i++) {

                this.objTiles[i] = [];
                this.objGrid._nodes[i] = [];
                for (var j = 0; j < data.background[0].length; j++) {
                    //initialize tile
                    this.objTiles[i][j] = generateTile(this.type, TILE_TYPE.obj, data.objects[i][j]);
                    //initialize position
                    this.objTiles[i][j].iPosition = new Vector2_p48(i, j);
                    //initialize grid
                    this.objGrid._nodes[i][j] = new TileNode(i, j);
                    if (this.objTiles[i][j].passSpeed && this.bgTiles[i][j].passSpeed)
                        this.objGrid._nodes[i][j].walkSpeed = //!!通行速度取bg和obj的平均值
                            this.objTiles[i][j].passSpeed / 2 + this.bgTiles[i][j].passSpeed / 2;
                    else
                        this.objGrid._nodes[i][j].walkSpeed = 0;
                    this.addChild(this.objTiles[i][j]);
                }
            }

            //读取人物及生物网格
            this.npcList = npcs;
            this.creatureGrid = new Grid();
            for (var i = 0; i < data.background.length; i++) {
                this.creatureGrid._nodes[i] = [];
                for (var j = 0; j < data.background[0].length; j++) {
                    this.creatureGrid._nodes[i][j] = new TileNode(i, j);
                    this.creatureGrid._nodes[i][j].walkSpeed = 1;
                }
            }
            for(var index in this.npcList){
                this.addChild( this.npcList[index]);
                this.creatureGrid._nodes[this.npcList[index].x / SIZE48]
                [this.npcList[index].y / SIZE48].walkSpeed = 0;
                  
            }
        }
    }


}

//!!!type 
type A = {

    [index: string]: { type: string, background: number[][], scene: number[][] }

}

/**所有地图的信息 */
var mapsJson: A = {
    "outside01": {
        type: "outside",
        background: [
            [1, 1, 1, 1, 1, 1, 1],//草地
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]],
        scene: [
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1]
        ]
    }
}

/**所有图块信息
 * 0用于报错
 * 1~9存储背景，之后的储存物体
 */
