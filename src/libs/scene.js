import { Container } from 'pixi.js';
import PubSub from 'pubsub-js';

/**
 * 场景基类
 */
export default class Scene extends Container {
    constructor(game) {
        super();
        this._game = game;
        this.init();
        this.preload();
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

    init() {}
    preload() {}
    pause() {}
    create() {}
    update() {}
}
