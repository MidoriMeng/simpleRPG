let TIME = 0;
let machine:GameStateMachine = null;

class Main extends egret.DisplayObjectContainer implements EventEmitter{
    stateMachine: GameStateMachine;
    missionPanel: MissionPanel;
    mapService: MAP.MapService;
    player: Player;
    user: User;
    observerList:Array<Observer>;
    commandList:CommandList;
    /**
     * 创建游戏场景
     * Create a game scene
     */

    private createGameScene(): void {
        //加载命令
        this.commandList = new CommandList();

        //加载点击事件类
        this.observerList = new Array<Observer>();
        ClickEvent.getInstance().registerObserver(this);
        ClickEvent.getInstance().loadCommand(this.commandList);

        //加载任务系统
        var stageW = this.stage.stageWidth;
        this.missionPanel = new MissionPanel();
        this.missionPanel.x = stageW - this.missionPanel.width;
        MissionService.getInstance().loadMissions();

        //加载状态机
        this.stateMachine = new GameStateMachine();
        machine = this.stateMachine;

        //加载地图
        this.mapService = MAP.MapService.getInstance();
        this.mapService.loadNPCs();
        this.mapService.loadMap();
        this.mapService.loadMachine(this.stateMachine);

        //加载用户
        var jewel_blue = new Jewel("湛蓝宝石", "jewel_blue_png", 3, 2);
        var jewel_green = new Jewel("碧绿宝石", "jewel_green", 1, 1);

        var skill_beat = new Skill("挥砍", "skill_chop_png", 1);
        var skill_blizzard = new Skill("暴风雪", "skill_blizzard_png", 1);
        var scroll_atkup = new Scroll("秘籍-攻击力上升", "atk_up_png");
        var scroll_hpup = new Scroll("秘籍-体力上升", "mhp_up_png");

        var sword = new Equipment("wood sword", equipmentType.WEAPON, 1, "sword_png");
        sword.addJewelery([jewel_blue]);

        var coat = new Equipment("cotton cloth", equipmentType.COAT, 1, "cloth_png");
        coat.addJewelery([jewel_green]);

        var hero1 = new Hero("Hero1", "Actor2_1_png");
        hero1.addEquip(sword);
        hero1.addEquip(coat);
        hero1.addSkill(skill_beat);
        hero1.addSkill(skill_blizzard);

        var hero2 = new Hero("Hero2", "Actor2_1_png");
        this.user = new User();
        var title = new Title("新手");
        this.user.heroes.push(hero1);
        this.user.heroes.push(hero2);
        this.user.changeTitle(title);
        this.user.heroes[0].inParty = true;

        //加载当前人物
        this.player = Player.getInstance();
        this.stateMachine.addState(this.player.curState);
        this.player.y = SIZE48;
        this.player.setCurHero(this.user.heroes[0]);
        this.player.searchAgent = new AStarSearch(this.mapService.curMap.objGrid,
            this.mapService.curMap.creatureGrid);
        this.player.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showHeroPanel, this);
        this.player.touchEnabled = true;
        //this.player.addObserver(MissionService.getInstance());
        //add other people here

        egret.startTick(this.stateMachine.runMachine, this.stateMachine);

        //加载怪物
        MonsterService.getInstance().x = 0;
        MonsterService.getInstance().y = 680;
        MonsterService.getInstance().loadMonsters();

        var autoButton = new egret.Shape();
        autoButton.graphics.beginFill(0x000000);
        autoButton.graphics.drawRect(200, 600, 80, 35);
        autoButton.graphics.endFill();
        this.addChild(autoButton);
        var text = new egret.TextField();
        text.text = "auto";
        text.x = 200; text.y = 600;
        this.addChild(text);
        text.touchEnabled = true;
        text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoButton, this);


        this.touchEnabled = true;
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

        this.addChild(this.mapService);
        this.addChild(this.player);
        this.addChild(this.missionPanel);
        this.addChild(MonsterService.getInstance());
        this.addChild(UIService.getInstance());

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);

        //test here
    }

    addObserver(o:Observer) {
        this.observerList.push(o);
    }

    notify(event:any){
        this.observerList.forEach((observer)=>{observer.onChange(event)});
    }

    autoButton() {
        var l = this.commandList;
        l.cancel();
        l.addCommand(new WalkCommand(281,280));
        l.addCommand(new TalkCommand("001"));
        l.addCommand(new WalkCommand(430,430));
        l.addCommand(new TalkCommand("002"));
        l.addCommand(new TalkCommand("002"));
        l.addCommand(new TalkCommand("002"));
        l.addCommand(new FightCommand());
        l.addCommand(new FightCommand());
        l.addCommand(new FightCommand());
        l.addCommand(new FightCommand());
        l.addCommand(new FightCommand());
        l.addCommand(new WalkCommand(281,280));
        l.addCommand(new TalkCommand("001"));
        l.execute();
    }
    showHeroPanel() {
        var userPanel = new HeroPanel(this.player.curHero);
        this.addChild(userPanel);
        this.player.touchEnabled = false;
        userPanel.close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.removeChild(userPanel);
            this.player.touchEnabled = true;
        }, this);
    }

    onTap(event: egret.TouchEvent) {
        this.notify(event);
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


