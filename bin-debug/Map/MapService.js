var MAP;
(function (MAP) {
    var MapService = (function () {
        function MapService() {
            //map 01
            var appearances = {
                NORTH: RES.getRes("Actor1_12_png"), SOUTH: RES.getRes("Actor1_02_png"),
                EAST: RES.getRes("Actor1_09_png"), WEST: RES.getRes("actor1_06_png")
            };
            var npc_001 = new NPC_stand("001", "npc1", appearances, DIRECTION.SOUTH, "Actor1_jpg");
            npc_001.setPosition(new Vector2_p48(5, 5));
            var npc_002 = new NPC_stand("002", "npc2", appearances, DIRECTION.SOUTH, "Actor1_jpg");
            npc_002.setPosition(new Vector2_p48(8, 8));
            var npcList = Array();
            npcList.push(npc_001);
            npcList.push(npc_002);
            this.curMap = new MAP.Map(MAP.tilemapJson[0 /* outside */][0], npcList);
        }
        var d = __define,c=MapService,p=c.prototype;
        return MapService;
    }());
    MAP.MapService = MapService;
    egret.registerClass(MapService,'MAP.MapService');
})(MAP || (MAP = {}));
//# sourceMappingURL=MapService.js.map