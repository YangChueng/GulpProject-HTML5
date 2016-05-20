define(function (require, exports, module) {
    var $ = require("zepto");
    module.exports = Picture;

    /**
     * 对外暴露的构造函数
     */
    function Picture() {
    }


    /**
     * 图片操作
     * @type {{rotation, filter, outline, shadow, position, fill, opacity, prepareCropped, cropped, cancelCropped}}
     * @private
     */
    Picture.prototype._operate = (function () {
        return {

            /**
             * 滤镜
             * @param obj
             */
            filter: function (obj) {
                var checked = getSelectedStatus(obj);
                var role = $(obj).attr("role");
                //灰色
                if (role == 'grayscale') {
                    applyFilter(0, checked && new f.Grayscale());
                    //反转
                } else if (role == 'invert') {
                    applyFilter(0, checked && new f.Invert());
                    //模糊
                } else if (role == 'blur') {
                    applyFilter(0, checked && new f.Convolute({
                            matrix: [1 / 9, 1 / 9, 1 / 9,
                                1 / 9, 1 / 9, 1 / 9,
                                1 / 9, 1 / 9, 1 / 9
                            ]
                        }));
                    //浮雕
                } else if (role == 'convolute') {
                    applyFilter(0, checked && new f.Convolute({
                            matrix: [1, 1, 1,
                                1, 0.7, -1, -1, -1, -1
                            ]
                        }));
                } else if (role == 'sepia') {
                    applyFilter(0, checked && new f.Sepia());
                    //青铜色
                } else if (role == 'sepia2') {
                    applyFilter(0, checked && new f.Sepia2());
                    //明亮
                } else if (role == 'brightness') {
                    applyFilter(0, checked && new f.Brightness({
                            brightness: parseInt(60, 10)
                        }));
                    //蓝色调
                } else if (role == 'blend') {
                    applyFilter(0, checked && new f.Blend({
                            color: '#17729e',
                            'mix-blend-mode': 'difference'
                        }));
                    //无
                } else if (role == 'none') {
                    applyFilter(0, false);
                }
            }
        }

    }());

    /**
     * 在canvas中绘制图片
     * @param  {[string]} path [图片路径]
     * @return
     */
    Picture.prototype.drawImage = function (obj) {
        var path = obj.attr('src');

        fabric.Image.fromURL(path, function (img) {
            var percent = canvas.width * 0.9 / img.width,
                top = Number(canvas.height / 2 - img.height * percent / 2),
                left = Number(canvas.width / 2 - img.width * percent / 2);
            if (percent >= 1) {
                percent = 1;
            }
            img.scale(percent).set({
                angle: 0,
                left: left,
                top: top,
                hasBorders:false
            });
            img.setControlsVisibility({
                bl: false,
                br: false,
                tl: false,
                tr: false,
                mt: false,
                mb: false,
                ml:false,
                mr:false,
                mtr:false
            });
            canvas.add(img).setActiveObject(img);
            //img.center();
            //canvas.renderAll();
        });


    };


    /**
     * 加载装饰文件
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    Picture.prototype.loadSVGImage = function (obj) {
        var url = obj.attr('data-svg');
        fabric.loadSVGFromURL(url, function (objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            var percent = Number(canvas.width / obj.width).toFixed(2) - 0.05,
                top = Number(canvas.height / 2 - obj.height * percent / 2),
                left = Number(canvas.width / 2 - obj.width * percent / 2);
            obj.scale(percent);
            obj.set({
                left: left,
                top: top,
                globalCompositeOperation: 'source-atop'
            });
            canvas.add(obj);
        });
    };

    /**
     * 加载
     * @param obj
     */
    Picture.prototype.loadPhotoFrame = function (obj) {
        var url = obj.attr('src');
        canvas.setOverlayImage(url, function (img) {
            canvas.overlayImage.width = canvas.width;
            canvas.overlayImage.height = canvas.height;
            canvas.overlayImage.top = -1;
            canvas.renderAll();
        });
    };

    /**
     * 应用滤镜
     * @param  {[type]} index  [canvas滤镜层数]
     * @param  {[type]} filter [滤镜的类型]
     * @return {[type]}        [description]
     */
    var applyFilter = function (index, filter) {
        var obj = canvas.getActiveObject();
        if (undefined != obj) {
            obj.filters[index] = filter;
            obj.applyFilters(canvas.renderAll.bind(canvas));
        }
    };

    /**
     * @returns {boolean}
     */
    var getSelectedStatus = function (o) {
        var checked = true,
            role = $(o).attr('role'),
            obj = canvas.getActiveObject();
        //if($(o).hasClass('selected')){
        //    checked = false;
        //}
        //if (obj.filters.length > 0) {
        //    if (!obj.filters[0]) {
        //        checked = true;
        //    }else{
        //        checked = false;
        //    }
        //} else {
        //    checked = true;
        //}
        return checked;
    };
});
