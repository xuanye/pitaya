export const View = {
    CONTAIN: function() {
        //该模式，就是缩放到屏幕完全放下游戏区域
        var self = this;
        self.scaleX = self.scaleY = Math.min(self.realScreenWidth / self.designWidth, self.realScreenHeight / self.designHeight);
        self.canvasWidth = self.designWidth * self.scaleX;
        self.canvasHeight = self.designHeight * self.scaleY;
    },
    COVER: function() {
        //根据宽高的最大比来缩放，用于撑满屏幕，需要设计安全区域
        var self = this;
        self.scaleX = self.scaleY = Math.max(self.realScreenWidth / self.designWidth, self.realScreenHeight / self.designHeight);
        self.canvasWidth = self.designWidth * self.scaleX;
        self.canvasHeight = self.designHeight * self.scaleY;
    },
    FILL: function() {
        var self = this;
        self.scaleX = self.realScreenWidth / self.designWidth;
        self.scaleY = self.realScreenHeight / self.designHeight;
        self.canvasWidth = self.realScreenWidth * self.scaleX;
        self.canvasHeight = self.realScreenHeight * self.scaleY;
    },
    FIXED_HEIGHT: function() {
        var self = this;
        self.scaleX = self.scaleY = self.realScreenHeight / self.designHeight;
        self.canvasWidth = self.realScreenWidth * self.scaleX;
        self.canvasHeight = self.realScreenHeight * self.scaleY;
    },
    FIXED_WIDTH: function() {
        var self = this;
        self.scaleX = self.scaleY = self.realScreenWidth / self.designWidth;
        self.canvasWidth = self.realScreenWidth * self.scaleX;
        self.canvasHeight = self.realScreenHeight * self.scaleY;
    },
    _setPolicy: function(mode) {
        var self = this;
        self._sizePolicy = mode;
    },
    _setSize: function() {
        let self = this;

        let [width, height] = [window.innerWidth, window.innerHeight];
        console.log('width, height', width, height);

        //portrait 竖屏 landscape 横屏
        const designMode = self.designWidth <= self.designHeight ? ViewMode.Portrait : ViewMode.Landscape;

        if (designMode === ViewMode.Portrait) {
            //竖屏设计
            self.realScreenHeight = Math.max(width, height); // 屏幕窗口宽度
            self.realScreenWidth = Math.min(width, height); // 屏幕窗口高度
        } else {
            self.realScreenWidth = Math.max(width, height); // 屏幕窗口宽度
            self.realScreenHeight = Math.min(width, height); // 屏幕窗口高度
        }

        self.realMode = width <= height ? ViewMode.Portrait : ViewMode.Landscape; //horizontal和vertical

        self._sizePolicy();

        self.rootStage.width = self.designWidth;
        self.rootStage.height = self.designHeight;

        if (self.realMode != designMode) {
            console.log('旋转');
            // 舞台旋转
            self.rootStage.x = self.realScreenHeight;
            self.rootStage.rotation = 90 * (Math.PI / 180); //旋转90°
        } else {
            self.rootStage.x = 0;
            self.rootStage.rotation = 0;
        }
        self.screenWidth = width;
        self.screenHeight = height;

        self.rootStage.scale.set(self.scaleX, self.scaleY);
        self.renderer.resize(width, height);
    },

    /**
     * 设置缩放适配模式
     * @param app {obj} 应用对象
     * @param designWidth {number} 设计稿宽度
     * @param designHeight {number} 设计稿高度
     * @param mode {obj} 内置五种缩放适配模式之一
     * @param resizeCallback resize回调函数
     */
    setViewMode: function(renderer, rootStage, screenWidth, screenHeight, designWidth, designHeight, mode, resizeCallback) {
        var self = this;
        self.renderer = renderer;
        self.rootStage = rootStage;
        self.screenWidth = screenWidth; // 屏幕宽度
        self.screenHeight = screenHeight; // 屏幕高度
        self.designWidth = designWidth; // 设计稿宽度
        self.designHeight = designHeight; // 设计稿高度

        self._setPolicy(mode);
        self._setSize();

        var resizeHandler = () => {
            self._setSize();
            resizeCallback &&
                resizeCallback({
                    realWidth: self.realScreenWidth,
                    realHeight: self.realScreenHeight,
                    width: Math.round(self.realScreenWidth / self.scaleX), //用于修正屏幕的相对位置,处理居中和贴边的情况
                    height: Math.round(self.realScreenHeight / self.scaleY),
                    screenWidth: self.screenWidth,
                    screenHeight: self.screenHeight,
                    designWidth: self.designWidth,
                    designHeight: self.designHeight,
                    scaleX: self.scaleX,
                    scaleY: self.scaleY,
                });
        };

        window.onresize = resizeHandler;
        return {
            realWidth: self.realScreenWidth,
            realHeight: self.realScreenHeight,
            width: Math.round(self.realScreenWidth / self.scaleX), //用于修正屏幕的相对位置,处理居中和贴边的情况
            height: Math.round(self.realScreenHeight / self.scaleY),
            screenWidth: self.screenWidth,
            screenHeight: self.screenHeight,
            designWidth: self.designWidth,
            designHeight: self.designHeight,
            scaleX: self.scaleX,
            scaleY: self.scaleY,
        };
    },
};

const ViewMode = {
    Portrait: 'portrait', //竖屏
    Landscape: 'landscape', //横屏
};
