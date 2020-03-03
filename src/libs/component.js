import { Container } from 'pixi.js';

export default class Component extends Container {
    constructor(options) {
        super();
        this.options = options;
        this.state = {};
        this.init();
        this.preload();
        this.create();
    }
    init() {}
    preload() {}
    create() {}
    pause() {}
    update() {}
}
