namespace MAP {
    /**所有地图的信息 */

    /**所有图块的信息 */
    export var tileJson = [
        //outside
        [
            //background
            [
                { texture: null, speed: 1 },//0:null
                { texture: "outside_bg_grass_png", speed: 1 }//1:grassland???
                //other backgrounds
            ],
            //obj
            [
                { texture: null, speed: 1 },//0:null
                { texture: "outside_sc_shrub_png", speed: 0 }//1:shrub
                //other objects
            ]
        ]
        //other kinds of scenes
    ]

    export var tilemapJson = [
        //maps whose SCENE_TYPE is outside
        [
            //first map of "outside"
            {
                type: SCENE_TYPE.outside,
                background: [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//草地
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


}