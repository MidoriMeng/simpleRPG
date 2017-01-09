class Grid {

    _startNode: TileNode;
    _endNode: TileNode;
    _nodes: TileNode[][] = [[]];
    _numCols: number;
    _numRows: number;


    /*constructor(data: { walkSpeed: number }[][]) {
        this._numCols = data.length;
        this._numRows = data[0].length;

        for (var i = 0; i < this._numCols; i++) {
            this._nodes[i] = [];
            for (var j = 0; j < this._numRows; j++) {
                this._nodes[i][j] = new TileNode(i, j);
                this._nodes[i][j].walkSpeed = data[i][j].walkSpeed;
            }
        }
    }*/
    public setStartNode(x: number, y: number) {
        this._startNode = this._nodes[x][y];
    }

    public setEndNode(x: number, y: number) {
        this._endNode = this._nodes[x][y];
    }


}

class TileNode {
		  x: number;
		  y: number;
		  f: number;
		  g: number;
		  h: number;

		  walkSpeed: number;
		  parent: TileNode;


    // bitmap: egret.Bitmap = null;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}

class AStarSearch {
    _openList: TileNode[] = [];
    _closedList: TileNode[] = [];
    _objGrid: Grid;
    _creatureGrid: Grid;
    _startNode: TileNode;
    _endNode: TileNode;
    _path: TileNode[] = [];
    _heuristic: Function = this.diagonal;
    _straightCost: number = 1.0;
    _diagCost: number = 10;

    _clickedAtUnwalkable: boolean;

    constructor(objGrid: Grid, creatureGrid: Grid) {
        this._objGrid = objGrid;
        this._creatureGrid = creatureGrid;
        this._clickedAtUnwalkable = false;
    }

    setStartNode(x: number, y: number){
        this._objGrid.setStartNode(x,y);
    }
    setEndNode(x: number, y: number){
        this._objGrid.setEndNode(x,y);
        this._creatureGrid.setEndNode(x,y);
    }
    public search(): Boolean {
        //init
        this._openList = new Array();
        this._closedList = new Array();

        this._startNode = this._objGrid._startNode;
        this._endNode = this._objGrid._endNode;
        if (!this._endNode.walkSpeed) {
            this._clickedAtUnwalkable = true;
            this._endNode.walkSpeed = 1;
        }
        if (!this._creatureGrid._endNode.walkSpeed) {
            this._clickedAtUnwalkable = true;
        }
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;

        //search
        var currentNode: TileNode = this._startNode;

        while (currentNode != this._endNode) {

            var startX: number = Math.max(0, currentNode.x - 1);
            var endX: number = Math.min(this._objGrid._numCols - 1, currentNode.x + 1);

            var startY: number = Math.max(0, currentNode.y - 1);
            var endY: number = Math.min(this._objGrid._numRows - 1, currentNode.y + 1);

            for (var i: number = startX; i <= endX; i++) {

                for (var j: number = startY; j <= endY; j++) {
                    var test: TileNode = this._objGrid._nodes[i][j];
                    if (test == currentNode || !test.walkSpeed ||
                        !this._objGrid._nodes[currentNode.x][test.y].walkSpeed ||
                        !this._objGrid._nodes[test.x][currentNode.y].walkSpeed) {   //console.log("index:"+ i + " " +j +" !speed:"+ !test.walkSpeed);
                        continue;
                    }

                    var cost: number = this._straightCost;
                    if (!((currentNode.x == test.x) || (currentNode.y == test.y))) {
                        cost = this._diagCost;
                    }

                    var g: number = currentNode.g + cost;
                    var h: number = this._heuristic(test);
                    var f: number = g + h;

                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = currentNode;
                        }
                    } else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = currentNode;
                        this._openList.push(test);
                    }
                }
            }


            this._closedList.push(currentNode);

            if (this._openList.length == 0) {

                return false;
            }

            this._openList.sort(function (a, b) {
                return a.f - b.f;
            });

            currentNode = this._openList.shift() as TileNode;

        }

        this.buildPath();

        return true;
    }



    public isOpen(node: TileNode): Boolean {
        for (var i: number = 0; i < this._openList.length; i++) {
            if (this._openList[i] == node) {
                return true;
            }
        }
        return false;
        //return this._openList.indexOf(node) > 0 ? true : false;
    }



    public isClosed(node: TileNode): Boolean {
        for (var i: number = 0; i < this._closedList.length; i++) {
            if (this._closedList[i] == node) {
                return true;
            }
        }
        return false;
    }



    public buildPath(): void {
        this._path = new Array();
        var node: TileNode = this._endNode;
        this._path.push(node);
        //console.log("end at:"+node.x + " "+node.y);
        while (node != this._startNode) {
            node = node.parent;
            //console.log(node.x + " "+node.y);
            this._path.push(node);  //结尾加入
        }
        if (this._clickedAtUnwalkable) {
            this._endNode.walkSpeed = 0;
            this._path.splice(0, 1);
            this._clickedAtUnwalkable = false;
        }
    }

    public manhattan(node: TileNode): number {
        return Math.abs(this._endNode.x - node.x) * this._straightCost + Math.abs(this._endNode.y - node.y) * this._straightCost;
    }

    public euclidian(node: TileNode): number {
        var dx: number = this._endNode.x - node.x;
        var dy: number = this._endNode.y - node.y;

        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    }


    public diagonal(node: TileNode): number {
        var dx: number = Math.abs(this._endNode.x - node.x);
        var dy: number = Math.abs(this._endNode.y - node.y);

        var diag: number = Math.min(dx, dy);
        var straight: number = dx + dy;

        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    }

    public visited(): TileNode[] {
        return this._closedList.concat(this._openList);
    }

    public validNode(node: TileNode, currentNode: TileNode): Boolean {
        if (currentNode == node || !node.walkSpeed) return false;

        if (!this._objGrid._nodes[currentNode.x][node.y].walkSpeed) return false;

        if (!this._objGrid._nodes[node.x][currentNode.y].walkSpeed) return false;

        return true;
    }
}
