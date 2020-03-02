import StateMachine from 'javascript-state-machine';

import Game from './libs/game';
import scenes from './scenes';
import pubsub from './libs/pubsub';
import config from './config';
class App extends Game {
    constructor(...args) {
        super(...args);
        this.sfm = new StateMachine(config.state); //有限状态机  finite state machines
        pubsub.enable(this, config.pubsub); //启用发布订阅模式
    }

    init() {
        Object.keys(scenes).forEach(key => {
            this.addScene(key, scenes[key]);
        });
    }

    preload() {
        this.loader.add('', '');
    }

    progress(loader, resources) {
        console.log('Loading...', loader.progress);
    }

    create() {
        //默认开启初始状态
        this.startScene(this.sfm.state);
    }
    update() {}

    onPing() {
        console.log('on ping event fired');
    }
}

export default App;
