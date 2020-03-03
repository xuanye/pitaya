import App from './app';

const app = new App({
    width: 440, // default: 800
    height: 750, // default: 600
    antialias: true, // default: false
    resolution: 1, // default: 1
});

document.body.appendChild(app.view);
