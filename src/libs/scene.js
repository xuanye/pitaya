import { Container } from 'pixi.js';

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

    init() {}
    preload() {}
    pause() {}
    create() {}
    update() {}
}
