import PubSub from 'pubsub-js';

/**
 * 场景基类
 */
export default class Scene extends PIXI.Container {
    constructor(game) {
        super();
        this._game = game;
        this.loader = game.loader;
        this.syncItems = [];
        this.resizeItems = [];
        this.init();
        this.preload();
        this.paused = false;
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
    init() {
        this.state = Object.assign({}, this._game.state);
        //console.log(this.state);
        //console.log('Scene -> init -> this._game.options', this._game.view.width, this._game.view.height);
    }
    preload() {}
    resume() {
        //显示的方法
        this.visible = true;
        this.paused = false;
        if (this.syncItems) {
            this.syncItems.forEach(item => {
                if (item && item.resume && typeof item.resume == 'function') {
                    item.resume.call(item);
                }
            });
        }
    }
    pause() {
        this.visible = false;
        this.paused = true;
        if (this.syncItems) {
            this.syncItems.forEach(item => {
                if (item && item.pause && typeof item.pause == 'function') {
                    item.pause.call(item);
                }
            });
        }
    }
    isPaused() {
        return this.paused;
    }
    create() {}
    /**
     * 注册需要同步的元素，该元素必须有update方法
     * @param {Object} item  需要同步的元素，该元素必须有update方法
     */
    sync(item, index) {
        if (item) {
            if ((item.update && typeof item.update == 'function') || (item._$update && typeof item._$update == 'function')) {
                if (typeof index == 'undefined') this.syncItems.push(item);
                else this.syncItems.splice(index, 0, item);
            }
        }
    }
    resizeHandler(item) {
        if (item) {
            if ((item.onResize && typeof item.onResize == 'function') || (item._$onResize && typeof item._$onResize == 'function')) {
                this.resizeItems.push(item);
            }
        }
    }
    onResize(options) {
        if (this.resizeItems && this.resizeItems.length > 0) {
            this.resizeItems.forEach(item => {
                if (item) {
                    if (item._$onResize && typeof item._$onResize == 'function') {
                        item._$onResize.call(item, options);
                    } else if (item.onResize && typeof item.onResize == 'function') {
                        item.onResize.call(item, options);
                    }
                }
            });
        }
    }
    cancelResizeHandler(item) {
        let index = this.resizeItems.indexOf(item);
        if (index > -1) {
            this.resizeItems.splice(index, 1);
        }
    }
    cancelSync(item) {
        let index = this.syncItems.indexOf(item);
        if (index > -1) {
            this.syncItems.splice(index, 1);
        }
    }
    update(delta, ...args) {
        if (this.syncItems && this.syncItems.length > 0) {
            this.syncItems.forEach(item => {
                if (item) {
                    if (item._$update && typeof item._$update == 'function') {
                        item._$update.call(item, delta, ...args);
                    } else if (item.update && typeof item.update == 'function') {
                        item.update.call(item, delta, ...args);
                    }
                }
            });
        }
    }
}
