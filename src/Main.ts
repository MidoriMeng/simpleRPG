let TIME = 0;

class Main extends egret.DisplayObjectContainer {
    stateMachine: GameStateMachine;
    missionPanel: MissionPanel;
    mapService:MAP.MapService;
    player: Player;
    /**
     * 创建游戏场景
     * Create a game scene
     */

    private createGameScene(): void {
        //加载地图
        this.mapService = new MAP.MapService();
        this.addChild(this.mapService.curMap);

        //加载状态机
        this.stateMachine = new GameStateMachine();

        //加载任务系统
        this.missionPanel = new MissionPanel();
        MissionService.getInstance().onStart();



        //加载人物
        this.player = new Player();
        this.stateMachine.addState(this.player.curState);
        this.player.y = SIZE48;
        this.player.searchAgent = new AStarSearch(this.mapService.curMap.objGrid,
        this.mapService.curMap.creatureGrid);
        this.player.addObserver(MissionService.getInstance());
        //add other people here
        
        

        egret.startTick(this.stateMachine.runMachine, this.stateMachine);

        this.touchEnabled = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

        this.addChild(this.player);


        //test here
        //this.player.acceptMission("00100201");
    }

    private onTap(event: egret.TouchEvent) {
        //console.log("tap" + event.stageX + "  " + event.stageY);
        this.player.Move(this.stateMachine, new Vector2(event.stageX, event.stageY));

    }
    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;



}


