var MAP;
(function (MAP) {
    var MapService = (function (_super) {
        __extends(MapService, _super);
        function MapService() {
            _super.call(this);
            this.touchEnabled = true;
            //map 01
            this.curNPCList = new Array();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }
        var d = __define,c=MapService,p=c.prototype;
        MapService.getInstance = function () {
            if (MapService.instance == null)
                MapService.instance = new MapService();
            return MapService.instance;
        };
        p.loadMachine = function (machine) {
            this.gameStateMachine = machine;
        };
        p.onTap = function (event) {
            if (!(event.target.parent instanceof NPC)) {
                console.log("tap@mapservice" + event.target.parent);
                Player.getInstance().Move(this.gameStateMachine, new Vector2(event.stageX, event.stageY), null);
            }
        };
        p.loadNPCs = function () {
            var appearances = {
                NORTH: RES.getRes("Actor1_12_png"), SOUTH: RES.getRes("Actor1_02_png"),
                EAST: RES.getRes("Actor1_09_png"), WEST: RES.getRes("actor1_06_png")
            };
            var npc_001 = new NPC("001", "npc1", appearances, DIRECTION.SOUTH, "Actor1_jpg");
            npc_001.setPosition(new Vector2_p48(5, 5));
            var npc_002 = new NPC("002", "npc2", appearances, DIRECTION.SOUTH, "Actor1_jpg");
            npc_002.setPosition(new Vector2_p48(8, 8));
            this.curNPCList.push(npc_001);
            this.curNPCList.push(npc_002);
        };
        p.loadMap = function () {
            this.curMap = new MAP.Map(MAP.tilemapJson[0 /* outside */][0], this.curNPCList);
            this.addChild(this.curMap);
        };
        p.getNPC = function (id) {
            for (var index in this.curNPCList) {
                if (this.curNPCList[index].id == id)
                    return this.curNPCList[index];
            }
        };
        return MapService;
    }(egret.DisplayObjectContainer));
    MAP.MapService = MapService;
    egret.registerClass(MapService,'MAP.MapService');
})(MAP || (MAP = {}));
//# sourceMappingURL=MapService.js.map