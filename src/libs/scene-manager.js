import Scene from './scene';

/**
 * 场景管理器
 */
export default class SceneManager {
    constructor(game) {
        this._scenes = {};
        this._active = {
            name: null,
            update: null,
            scene: null,
        };
        this._game = game;
    }

    /**
     * 注册场景
     * @param {String} name 场景名称
     * @param {Scene} scene 场景对象
     */
    add(name, scene) {
        if (this._scenes[name]) {
            console.warn(`${name} scene has registered, please rename it`);
        }
        this._scenes[name] = scene;
    }
    /**
     * 开始场景
     * @param {String} name
     */
    start(name) {
        setTimeout(() => {
            if (this._active.update) this._game.ticker.remove(this._active.update);

            if (this._active.scene && this._active.scene.parent) {
                if (this._active.scene.pause && typeof this._active.scene.pause == 'function') {
                    this._active.scene.pause();
                }
                this._game.stage.removeChild(this._active.scene);
            }

            const ActiveScene = this._scenes[name];

            if (!ActiveScene) throw new Error(`${name} scene is not exist`);

            const activeScene = new ActiveScene(this._game);

            this._game.stage.addChildAt(activeScene, 0);

            //console.log('SceneManager -> start -> typeof activeScene.create', typeof activeScene.create);
            //调用创建
            if (activeScene.create && typeof activeScene.create == 'function') {
                activeScene.create();
                activeScene.__isCreated = true;
            }

            const update = () => {
                if (!activeScene.__isCreated) return;
                activeScene.update();
            };
            this._game.ticker.add(update);

            this._active.name = name;
            this._active.scene = activeScene;
            this._active.update = update;
        });
    }
}
