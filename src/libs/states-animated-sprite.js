const { AnimatedSprite, Texture } = PIXI;

export class StatesAnimatedSprite extends AnimatedSprite {
    constructor(frameBaseName, states, initState) {
        let arrName = frameBaseName.split('.');
        let extName = arrName.pop();
        let preName = arrName.join('.');
        let animatedStates = {};
        let stateKeys = Object.keys(states);
        if (!initState || !states[initState]) {
            initState = stateKeys[0];
        }

        Object.keys(states).forEach(key => {
            let range = states[key];
            let textures = [];
            if (range.length == 1) {
                textures.push(Texture.from(`${preName}${range[0]}.${extName}`));
            } else {
                for (let i = range[0], l = range[1]; i <= l; i++) {
                    textures.push(Texture.from(`${preName}${i}.${extName}`));
                }
            }

            animatedStates[key] = textures;
        });

        super(animatedStates[initState]);

        this.animatedStates = animatedStates;
    }
    playState(stateName) {
        if (this.animatedStates[stateName] && this.animatedStates[stateName].length > 0) {
            this.stop();
            this.textures = this.animatedStates[stateName];
            this.gotoAndPlay(0);
        } else {
            console.log(this.animatedStates);
            console.warn('stateName=' + stateName + ' is notfound');
        }
    }
}
