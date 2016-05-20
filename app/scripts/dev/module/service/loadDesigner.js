/**
 * 加载设计器
 */
define(function(require, exports, module) {

    var Loading = {};

    module.exports = Loading;

    var $ = require('zepto');

    /**
     * 启动设计器,开始加载数据
     * @private
     */
    Loading._startLoading = function() {
        this._resetDesigner();
    };


    /**
     * 设置设计器的宽高
     */
    Loading._resetDesigner = function() {
        var canvasObj = document.getElementById("designer");
        var offsetWidth = document.body.offsetWidth;
        var offsetHeight = document.body.offsetHeight;
        var canvasWidth = offsetWidth * 0.55;
        var canvasHeight = canvasWidth * 9 / 5;
        $(canvasObj).attr('width', canvasWidth);
        $(canvasObj).attr('height', canvasHeight);


        //定义一个全局的canvas,此对象唯一,页面初始化时需要加载完毕
        //此后有若干模块依赖该对象
        window.canvas = new fabric.Canvas('designer', {
            allowTouchScrolling: true
        });


        //设置底部
        var maskImg = "./images/base_iphone6s_177607_gold.png",
          overImg = "./images/iphone4s_2_2.png";
        var offsetLeft = canvas.wrapperEl.offsetLeft;
        $("#mask-img").attr("src", maskImg);
        $("#mask-img").css({
            "width": canvas.width,
            "height": canvas.height,
            "left": offsetLeft
        });

        //设置遮罩层
        // canvas.setOverlayImage(overImg, function(img) {
        //     canvas.overlayImage.width = canvas.width;
        //     canvas.overlayImage.height = canvas.height;
        //     canvas.overlayImage.top = -1;
        //     canvas.renderAll();
        // });
    };
});
