var PLAYER_VELOCITY = 0.2;
var ANIMATION_FRAMESPEED = 24; //动画播放帧速
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["NORTH"] = 0] = "NORTH";
    DIRECTION[DIRECTION["SOUTH"] = 1] = "SOUTH";
    DIRECTION[DIRECTION["WEST"] = 2] = "WEST";
    DIRECTION[DIRECTION["EAST"] = 3] = "EAST";
})(DIRECTION || (DIRECTION = {}));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.missionList = [];
        this.level = 1;
        this.hp = 200;
        this.velocity = PLAYER_VELOCITY; //pixel per frame
        this.curState = new PLAYER.IdleState(this);
        this.orientation = DIRECTION.EAST;
        this.appearance = new egret.Bitmap(RES.getRes("actor1_05_png"));
        this.animationList = {
            "idle_west": ["actor1_06_png"],
            "idle_east": ["Actor1_09_png"],
            "idle_north": ["Actor1_12_png"],
            "idle_south": ["Actor1_02_png"],
            "walk_west": ["actor1_05_png", "actor1_06_png", "Actor1_07_png", "actor1_06_png"],
            "walk_east": ["Actor1_08_png", "Actor1_09_png", "Actor1_10_png", "Actor1_09_png"],
            "walk_north": ["Actor1_11_png", "Actor1_12_png", "Actor1_13_png", "Actor1_12_png"],
            "walk_south": ["Actor1_01_png", "Actor1_02_png", "Actor1_03_png", "Actor1_02_png"]
        };
        this.observerList = new Array();
        this.addChild(this.appearance);
    }
    var d = __define,c=Player,p=c.prototype;
    p.acceptMission = function (missionID) {
        var mission = MissionService.getInstance().getMissionById(missionID);
        if (MissionService.getInstance().acceptMission(missionID))
            this.missionList.push(mission);
    };
    p.finishMission = function (missionID) {
        MissionService.getInstance().submitMission(missionID);
    };
    p.notify = function () {
        if (this.observerList.length)
            for (var i in this.observerList) {
                this.observerList[i].onChange(this);
            }
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
        this.notify();
    };
    p.Move = function (stateMachine, target) {
        //获取vec2_p48格式的当前点、目标点
        var position_48 = new Vector2_p48(0, 0);
        position_48.x = this.x;
        position_48.y = this.y;
        var target_48 = new Vector2_p48(0, 0);
        target_48.x = target.x;
        target_48.y = target.y;
        //寻路
        this.searchAgent._objGrid.setStartNode(position_48.indexX, position_48.indexY); //更新agent start, end node
        this.searchAgent._objGrid.setEndNode(target_48.indexX, target_48.indexY);
        this.searchAgent.search(); //寻路,建立路径
        stateMachine.switchState(this.curState, new PLAYER.WalkState(this));
    };
    p.updateOrientation = function (target) {
        if (target.x - this.x > 0) {
            this.orientation = DIRECTION.EAST;
            this.curAnimation = new Animation(this
                .animationList["idle_east"], this.appearance, ANIMATION_FRAMESPEED);
        }
        else if (target.x - this.x < 0) {
            this.orientation = DIRECTION.WEST;
            this.curAnimation = new Animation(this
                .animationList["idle_west"], this.appearance, ANIMATION_FRAMESPEED);
        }
        if (target.y - this.y > 0) {
            this.orientation = DIRECTION.SOUTH;
            this.curAnimation = new Animation(this
                .animationList["idle_south"], this.appearance, ANIMATION_FRAMESPEED);
        }
        else if (target.y - this.y < 0) {
            this.orientation = DIRECTION.NORTH;
            this.curAnimation = new Animation(this
                .animationList["idle_north"], this.appearance, ANIMATION_FRAMESPEED);
        }
    };
    p.updateWalkAnimationClip = function () {
        switch (this.orientation) {
            case DIRECTION.NORTH:
                this.curAnimation = new Animation(this
                    .animationList["walk_north"], this.appearance, ANIMATION_FRAMESPEED);
                break;
            case DIRECTION.EAST:
                this.curAnimation = new Animation(this
                    .animationList["walk_east"], this.appearance, ANIMATION_FRAMESPEED);
                break;
            case DIRECTION.SOUTH:
                this.curAnimation = new Animation(this
                    .animationList["walk_south"], this.appearance, ANIMATION_FRAMESPEED);
                break;
            case DIRECTION.WEST:
                this.curAnimation = new Animation(this
                    .animationList["walk_west"], this.appearance, ANIMATION_FRAMESPEED);
                break;
        }
    };
    return Player;
}(egret.DisplayObjectContainer));
egret.registerClass(Player,'Player');
//# sourceMappingURL=Player.js.map