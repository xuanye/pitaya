import Game from './libs/game';
import scenes from './scenes';
import config from './config';
import constants from './constants';

class App extends Game {
    constructor(options) {
        super(options);
        this.options = Object.assign({}, options);
    }

    /**
     * 重写创建游戏状态
     */
    createState() {
        let state = {
            methods: {
                onTransition: this.onTransition.bind(this),
            },
        };
        let newState = Object.assign(super.createState(), config.state, state);
        console.log(newState);

        return newState;
    }
    //------------------------
    // 默认的事件处理
    //-----------------------

    init() {
        Object.keys(scenes).forEach(sceneName => {
            this.addScene(sceneName, scenes[sceneName]);
        });
        // 事件订阅
        this.subscribe(constants.EVENTS.START_GAME, this.onStartGame.bind(this));
        this.subscribe(constants.EVENTS.END_GAME, this.onEndGame.bind(this));
    }

    preload() {
        this.loader.add('', '');
    }

    progress(loader, resources) {
        console.log('Loading...', loader.progress);
    }

    create() {
        console.log('App -> create -> this.state', this.fsm.state);
        //默认开启初始状态
        //this.startScene(this.fsm.state);
    }
    update() {}

    //------------------------
    // 状态机的事件
    //-----------------------
    onTransition(lifecycle) {
        console.log(lifecycle.transition);
        console.log(lifecycle.from);
        console.log(lifecycle.to);
        this.startScene(lifecycle.to);
    }

    //------------------------
    // 发布订阅的事件
    //-----------------------
    onPing() {
        console.log('on ping event fired');
    }
    onStartGame() {
        console.log('on start game event fired');
        this.fsm.play();
    }
    onEndGame() {
        console.log('on start game event fired');
        this.fsm.lose();
    }
}

export default App;
