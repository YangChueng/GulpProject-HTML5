/**
 * 数据存储模块
 */
define(function(require, exports, module) {

    var $ = require('zepto');
    var Data = require('../service/data');

    module.exports = Cache;

    function Cache() {}

    /**
     * 初始化加载数据
     * @private
     */
    Cache.prototype = {

        container: $('.m-content'),

        _initData: function() {
            var cacheVersion = sessionStorage.version;
            console.log('version:' + window.version);
            if (undefined == cacheVersion) {
                sessionStorage.clear(); //清除旧数据
                sessionStorage.version = window.version;
            } else if (cacheVersion != window.version) {
                sessionStorage.clear();
                sessionStorage.version = window.version;
            }
            this._loadFont();
            this._loadDecoration();
            // this._loadCartoonGroup();
            // this._loadCartoonChange();
            this._loadFilter();
            // this._loadPhotoFrame();
        },

        _loadFont: function() {
            if (undefined == sessionStorage.font) {
                var data = Data.fonts,
                    str = "";
                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];
                    str += "<img data-original='" + item + "' class='m-image m-source m-decoration' type='photo'>";
                }
                sessionStorage.font = str;
            }
        },

        _loadDecoration: function() {
            if (undefined == sessionStorage.decoration) {
                var data = Data.decoration,
                    img = "";
                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];
                    img += "<img data-original='" + item + "' class='m-image m-source m-decoration' type='photo'>";
                }
                sessionStorage.decoration = img;
            }
        },

        _loadCartoonGroup: function() {
            if (undefined == sessionStorage.ctgroup) {
                var data = Data.cartoonGroup,
                    img = "";
                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];
                    img += "<img data-original='" + item + "' class='m-image m-source' type='photo'>";
                }
                sessionStorage.ctgroup = img;
            }
        },

        _loadCartoonChange: function() {
            if (undefined == sessionStorage.ctchange) {
                var data = Data.cartoonChange,
                    img = "";
                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];
                    img += "<img data-original='" + item + "' class='m-image m-source' type='frame'>";
                }
                sessionStorage.ctchange = img;
            }
        },

        _loadFilter: function() {
            if (undefined == sessionStorage.filter) {
                var data = Data.filter,
                    img = "";
                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];
                    img += "<img data-original='" + item.url + "' class='m-image m-source' role='" + item.name + "' type='filter'>";
                }
                sessionStorage.filter = img;
            }
        },

        _loadPhotoFrame: function() {
            if (undefined == sessionStorage.frame) {
                var data = Data.photoFrame,
                    img = "";
                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];
                    img += "<img data-original='" + item + "' class='m-image m-source' type='frame'>";
                }
                sessionStorage.frame = img;
            }
        }
    };
});
