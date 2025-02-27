import { Text, TextStyle } from 'pixi.js';
import Scene from '../libs/scene';
import constants from '../constants';
export default class LoadingScene extends Scene {
    init() {
        super.init();
        console.log('loading  init');
        this._angle = 0;
    }
    preload() {
        console.log('loading  preload');
    }
    pause() {
        super.pause();
        console.log('loading  pause');
    }
    create() {
        console.log('loading  create');
        const style = new TextStyle({
            align: 'right',
            dropShadow: true,
            dropShadowAlpha: 0.2,
            dropShadowAngle: 0.6,
            dropShadowColor: '#676565',
            dropShadowDistance: 2,
            fill: '#27825a',
            fontSize: 25,
            lineHeight: 45,
            stroke: '#666',
        });
        this.text = new Text('点我进入游戏...', style);

        this.text.x = this.state.width / 2 - this.text.width / 2;
        this.text.y = this.state.height / 2 - this.text.height / 2;

        this.text.interactive = true;
        this.text.buttonMode = true;
        this.text.on('pointerdown', () => {
            super.publish(constants.EVENTS.START_GAME); //发布事件
        });
        this.addChild(this.text);
    }
    update() {
        this.text.y += Math.cos(this._angle);
        this._angle += 0.2;
    }
    onResize({ width, height }) {
        console.log(width, height);
        this.state.width = width;
        this.state.height = height;
        this.text.x = width / 2 - this.text.width / 2;
        this.text.y = height / 2 - this.text.height / 2;
    }
}
