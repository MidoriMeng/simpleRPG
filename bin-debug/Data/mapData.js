var MAP;
(function (MAP) {
    /**所有地图的信息 */
    /**所有图块的信息 */
    MAP.tileJson = [
        //outside
        [
            //background
            [
                { texture: null, speed: 1 },
                { texture: "outside_bg_grass_png", speed: 1 } //1:grassland???
            ],
            //obj
            [
                { texture: null, speed: 1 },
                { texture: "outside_sc_shrub_png", speed: 0 } //1:shrub
            ]
        ]
    ];
    MAP.tilemapJson = [
        //maps whose SCENE_TYPE is outside
        [
            //first map of "outside"
            {
                type: 0 /* outside */,
                background: [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ],
                objects: [
                    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 0, 1, 0, 0, 1, 1, 1],
                    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
                    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ]
            }
        ]
    ];
})(MAP || (MAP = {}));
//# sourceMappingURL=mapData.js.map