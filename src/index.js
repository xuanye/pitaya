import App from './app';

const designWidth = 750 / 2;
const designHeight = 1334 / 2;

const screenWidth = PIXI.utils.isMobile.any ? window.innerWidth : designWidth / 2;
const screenHeight = PIXI.utils.isMobile.any ? window.innerHeight : designHeight / 2;

const pixelRatio = Math.min(2, devicePixelRatio);

const app = new App({
    width: screenWidth,
    height: screenWidth,
    screenWidth: screenWidth,
    screenHeight: screenHeight,
    designWidth,
    designHeight,
    antialias: true, // default: false
    resolution: 1, // default: 1
});

document.body.appendChild(app.view);
