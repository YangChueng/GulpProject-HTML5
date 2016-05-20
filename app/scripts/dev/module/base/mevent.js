/**
 *自定义事件监听模块
 */
define(function (require, exports, module) {

    var $ = require('zepto');

    var mEvent = {};

    module.exports = mEvent;

    /**
     *监听事件
     */
    mEvent.listen = (function () {

        return {

            content: $('.m-content'),

            toolbar: $('.m-toolbar'),

            effect: $('.m-effect'),

            preBtn: $('.pre-btn'),

            delBtn: $('.del-btn'),

            preview: $('.m-preview'),

            save: $('.m-save'),

            back: $('.m-back'),

            fallback: $('a.pull-left'),

            _init: function () {
                this._imageSelect();
                this._effectSelect();
                this._preview();
                this._fallback();
                this._fontSelect();
                this._save();
                this._delete();
                this._effectSelect();
            },

            /**
             * 工具栏点击事件
             * 显示数据源
             * @private
             */
            _toolBarClick: function () {
                var $content = $('.m-content'),
                    $container = this.toolbar,
                    $me = this;
                $container.find('a').off('click').on('click', function (e) {
                    $container.find('a').removeClass('active');
                    $(this).addClass('active');
                    var role = $(this).attr("role");
                    if (role == 'group') {
                        $('.group-items').show();
                    } else {
                        $('.group-items').hide();
                        if (role == 'picture') {
                            $content.html(temp);
                            var Photo = require("../image/photo");
                            Photo._init();
                        } else {
                            $content.html(sessionStorage[role]);
                        }
                        $me._imageSelect();
                        lazyLoad();
                    }
                });
            },

            /**
             * 选择字体
             * @private
             */
            _fontSelect: function () {
                var $container = this.content;
                $container.find(".m-font").off("click").on("click", function (e) {
                    var $font = $(this);
                    if ($container.find('.m-font.selected').length > 0) {
                        $container.find('.m-font.selected').removeClass("selected").css("border-color", "#fff");
                    }
                    if (!$font.hasClass('selected')) {
                        $font.css("border-color", "red");
                        $font.addClass('selected');
                        var font = require('../font/font');
                        var Font = new font();
                        Font.drawFont($font.attr("name"), $font.attr("name"));
                    }
                });
            },

            /**
             * 选择图片
             * @private
             */
            _imageSelect: function () {
                var $container = this.content;
                $container.find('img').off("click").on("click", function (e) {
                    e.preventDefault();
                    var $image = $(this),
                        type = $image.attr('type'),
                        role = $image.attr('role');

                    //默认图片不做处理
                    if($image.attr('src').indexOf('default')>-1){
                        return;
                    }

                    if ($container.find('img.selected').length > 0) {
                        $container.find('img.selected').removeClass("selected").css("border-color", "#fff");
                    }
                    if (!$image.hasClass('selected')) {
                        $image.css("border-color", "red");
                        $image.addClass('selected');
                    }

                    var img = require('../image/image'),
                        Picture = new img();
                    if (type == 'filter') {
                        Picture._operate.filter($image);
                    } else if (type == 'svg') {
                        Picture.loadSVGImage($image);
                    } else if (type == 'photo') {
                        Picture.drawImage($image);
                    } else if (type == 'frame') {
                        Picture.loadPhotoFrame($image);
                    }
                });

            },

            /**
             * 选择滤镜
             * @private
             */
            _effectSelect: function () {
                var $a = this.effect.find('.effects a'),
                    $me = this,
                    $content = $('.m-content');
                $('.m-effect').hide();
                $me._toolBarClick();
                $me._imageSelect();
                $('.m-toolbar').find('a').removeClass('active');
                $('.m-toolbar').find('a[role="picture"]').addClass('active');
                $content.html(temp);
                lazyLoad();
                //$a.on('click', function (e) {
                //    $('.m-effect').hide();
                //    $me._toolBarClick();
                //    var role = $(this).attr('role');
                //    $('.m-toolbar').find('a').removeClass('active');
                //    $('.m-toolbar').find('a[role="group"]').addClass('active');
                //    $('.m-content').html(sessionStorage[role]);
                //    $me._imageSelect();
                //    lazyLoad();
                //});
            },

            /**
             * 预览
             * @private
             */
            _preview: function () {
                var $preview = this.preview,
                    $me = this;
                this.preBtn.on('click', function (e) {
                    canvas.deactivateAll();
                    var image_str = canvas.toDataURL('png');
                    $preview.show().find('.pre-img img').attr("src", image_str);
                    $me._back();
                });
            },

            /**
             * 删除
             * @private
             */
            _delete: function () {
                this.delBtn.on('click', function (e) {

                    var p = require('../tool/popup'),
                        Popup = new p();
                    
                    Popup.alert('confirm','确定要删除?',function(){
                        if (canvas.getObjects().length == 0) {
                            if (null != canvas.overlayImage || undefined != canvas.overlayImage) {
                                canvas.setOverlayImage(null);
                            }
                        }
                        var canvasObj = canvas.getActiveObject();
                        canvas.remove(canvasObj);
                        canvas.renderAll();
                    });
                });
            },

            /**
             * 保存
             * @private
             */
            _save: function () {
                this.save.off('click').on('click', function (e) {
                    var strData = $('.pre-img').find('img').attr('src'),
                        strDownloadMime = "image/octet-stream",
                        _suffix = '.png';
                    time = new Date().getTime();
                    //直接改图片的mimeType，强制改成steam流类型的。比如‘image/octet-stream’，浏览器就会自动帮我们另存为..
                    var result = strData.replace("image/png", strDownloadMime);
                    //非微信,执行该操作
                    if(!isWX){
                        var a = document.createElement('a');
                        a.download = time + _suffix;//文件名称
                        a.href = result;
                        a.click();
                    }
                    //下载完成,清空canvas;
                    canvas.clear();
                    canvas.setOverlayImage(null);
                    canvas.renderAll();
                    sessionStorage.clear();
                    $('.m-preview,.m-effect').hide();
                    $('.m-index').show();
                    var Photo = require("../image/photo");
                    Photo._init();
                });
            },

            /**
             * 再看一看
             * @private
             */
            _back: function () {
                var $preview = this.preview;
                this.back.on('click', function (e) {
                    $preview.hide();
                });
            },

            /**
             * 返回
             * @private
             */
            _fallback: function () {
                var $effect = this.effect,
                    $preview = this.preview;
                this.fallback.on('click', function (e) {
                    var to = $(this).attr('to');
                    if (to == 'effect') {
                        $effect.show();
                    } else if (to == 'design') {
                        $preview.hide();
                    }
                });
            }
        }

    })();

    /**
     * 懒加载图片
     */
    var lazyLoad = function(){
        var $ = require('jquery');
        require('lazyload')($);
        var $content = $('.m-content');
        $content.on('scroll',function(e){
            $(".m-content img").lazyload({
                placeholder : "images/default.gif"
            });
        });
        $content.find("img").lazyload({
            placeholder : "images/default.gif"
        });
    }
});