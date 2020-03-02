import { Application } from 'pixi.js';
import SceneManager from './scene-manager';

export default class Game extends Application {
    constructor(...args) {
        super(...args);
        this.ssm = new SceneManager(); //simple scene manager

        this.init();
        this.preload();

        // 下载资源进度
        this.loader.onProgress.add(this.progress);
        //下载资源完成
        this.loader.load(this.create);

        //游戏主循环
        this.ticker.add(this.update);
    }

    /**
     * 添加场景
     * @param  {...Scene} scenes 场景信息，可以多个
     */
    addScene(...scenes) {
        this.ssm.add(scenes);
        return this;
    }

    /**
     * 开始某个场景
     * @param {String} name 场景的名称
     */
    startScene(name) {
        this.ssm.start(name);
    }

    /**
     * 初始化方法
     */
    init() {}
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
    update() {}
}
