define(function (require, exports, module) {
    var $ = require("zepto");

    /**
     * 初始化配置
     * @type {Object}
     */
    var Options = {

        userAgent: function () {
            var u = navigator.userAgent;
            // window.isWX = false;
            // if (u.match(/MicroMessenger/i) == "MicroMessenger") {
            //     isWX = true;
            // } else {
            //     isWX = false;
            // }
            // if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('Windows Phone') > -1) {//安卓手机
            //     //安卓端微信在其他浏览器中打开
            //     if(isWX){
            //         $("#weixinTip").show();
            //         return;
            //     }
            // } else if (u.indexOf('iPhone') > -1) {//苹果手机
            //     return;
            // }
        },
        /**
         * 设置canvas对象以及在不同尺寸屏幕的宽高
         */
        loadDesigner: function () {
            var Loading = require('./module/service/loadDesigner');
            Loading._startLoading();
            window.temp = "<a class='m-source m-image m-add' id='uploader'></a>";
                // "<input type='file' class='upload photoInput' accept='image/*' role='design' >";
            $('.m-content').html(temp);
            var mEvent = require("./module/base/mevent");
            mEvent.listen._init();
            window.f = fabric.Image.filters;
            window.version = "0.0.8";
        },

        /**
         * 加载相册模块
         */
        loadPhotoModule: function () {
            var Photo = require("./module/image/photo");
            Photo._init();
        },

        /**
         * 加载存储数据
         */
        loadStorage: function () {
            var cache = require('./module/service/cache');
            var Cache = new cache();
            Cache._initData();
        },

        /**
         * 初始化方法
         */
        setDefault: function () {
            var $me = this;
            $me.userAgent();
            $me.loadDesigner();
            $me.loadPhotoModule();
            $me.loadStorage();
        }
    };

    /**
     * 初始化
     */
    Options.setDefault();
});
