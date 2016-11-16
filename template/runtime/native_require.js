
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/AI.js",
	"bin-debug/Animation.js",
	"bin-debug/Data/mapJson.js",
	"bin-debug/FSM.js",
	"bin-debug/interfaces.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Map/Map&mapSettings.js",
	"bin-debug/Map/MapService.js",
	"bin-debug/Map/TileSettings.js",
	"bin-debug/Mission/Mission.js",
	"bin-debug/Mission/MissionPanel.js",
	"bin-debug/Mission/MissionSystem.js",
	"bin-debug/NPC.js",
	"bin-debug/Player/Player.js",
	"bin-debug/Player/stateMachine.js",
	"bin-debug/string.js",
	"bin-debug/UI/Dialog.js",
	"bin-debug/UI/UIService.js",
	"bin-debug/Util.js",
	"bin-debug/Vector.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};