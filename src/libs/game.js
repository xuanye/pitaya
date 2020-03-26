import StateMachine from 'javascript-state-machine';
import SceneManager from './scene-manager';
import PubSub from 'pubsub-js';
import { Container } from 'pixi.js';
import { View } from './view';
export default class Game extends PIXI.Application {
    constructor(options) {
        super(options);

        this.ssm = new SceneManager(this); //simple scene manager
        this.fsm = new StateMachine(this.createState()); //有限状态机  finite state machines
        this.initRootStage(options);
        this.init();
        this.preload();
        //游戏主循环
        this.ticker.add(this.update.bind(this));
    }
    initRootStage(options) {
        this.rootStage = new Container();
        this.rootStage.width = options.width;
        this.rootStage.height = options.height;
        this.stage.addChild(this.rootStage);
        this.detectOrient(options);
    }
    renderScene(scene) {
        this.rootStage.addChildAt(scene, 0);
    }
    getAdapterMode() {
        return View.FIXED_HEIGHT;
    }
    /**
     * 横竖屏处理
     */
    detectOrient(options) {
        let sizeOptions = View.setViewMode(
            this.renderer,
            this.rootStage,
            options.screenWidth,
            options.screenHeight,
            options.designWidth,
            options.designHeight,
            this.getAdapterMode(),
            options => {
                this.onResize(options);
                //console.log('Game -> detectOrient -> options', options);
            }
        );
        this.state = sizeOptions;
        ///console.log('Game -> detectOrient -> sizeOptions', sizeOptions);
    }
    createState() {
        return {
            transitions: [],
        };
    }
    /**
     * 添加场景
     * @param {*} name 场景名称
     * @param {*} scene 场景
     */
    addScene(name, scene) {
        this.ssm.add(name, scene);
        return this;
    }
    /**
     * 批量添加场景
     * @param {*} scenes 场景信息 { sceneName1:sceneObj1,sceneName2:sceneObj2 }
     */
    addScenes(scenes) {
        Object.keys(scenes).forEach(sceneName => {
            this.addScene(sceneName, scenes[sceneName]);
        });
    }
    /**
     * 开始某个场景
     * @param {String} name 场景的名称
     * @param {*} args 场景init的参数
     */
    startScene(name, args) {
        this.ssm.start(name, args);
    }

    /**
     * 初始化方法
     */
    init() {
        this.stage.addChild(this.rootStage);
    }
    /**
     * 预加载资源需要重新这个方法
     */
    preload() {}

    /**
     * 资源加载进度
     */
    progress(loader, resources) {}
    /**
     * 资源加载完成后，开始游戏状态
     * @param {*} loaders 记载器
     * @param {*} resources 资源信息
     */
    create(loader, resources) {}

    /**
     * 主事件循环中
     */
    update(delta) {
        //调用场景的刷新
        this.ssm.update(delta);
    }

    onResize(options) {
        this.ssm.onResize(options);
    }
    //---------------------
    // 发布/订阅模式的简单封装
    //---------------------
    subscribe(...args) {
        PubSub.subscribe(...args);
    }
    publish(...args) {
        PubSub.publish(...args);
    }
}
