import { Text, TextStyle } from 'pixi.js';
import Scene from '../libs/scene';

export default class OverScene extends Scene {
    init() {
        super.init();
        console.log('Over  init');
        this._angle = 0;
    }
    preload() {
        console.log('Over  preload');
    }
    pause() {
        super.pause();
        console.log('Over  pause');
    }
    create() {
        const style = new TextStyle({
            align: 'right',
            dropShadow: true,
            dropShadowAlpha: 0.2,
            dropShadowAngle: 0.6,
            dropShadowColor: '#676565',
            dropShadowDistance: 2,
            fill: '#822742',
            fontSize: 50,
            lineHeight: 45,
            stroke: '#666',
        });
        this.text = new Text('游戏结束...', style);

        this.text.x = this.state.width / 2 - this.text.width / 2;
        this.text.y = this.state.height / 2 - this.text.height / 2;
        this.addChild(this.text);
    }
    update() {
        //this.text.y += Math.cos(this._angle);
        //this._angle += 0.2;
    }
    onResize({ width, height }) {
        this.state.width = width;
        this.state.height = height;
        this.text.x = width / 2 - this.text.width / 2;
        this.text.y = height / 2 - this.text.height / 2;
    }
}
