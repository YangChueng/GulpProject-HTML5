/**
 * 图片相册模块
 * @param  {[type]} require   [description]
 * @param  {[type]} exports   [description]
 * @param  {[type]} module){               var $ [description]
 * @return {[type]}           [description]
 */
define(function(require, exports, module) {

    var $ = require("zepto");
    var mEvent = require('../base/mevent');

    var Photo = {};

    module.exports = Photo;

    /**
     * 初始化
     * @private
     */
    Photo._init = function() {
        this.popMobileAlbum();
    };

    /**
     * 弹出手机相册
     * @return
     */
    Photo.popMobileAlbum = function() {
        // this.uploadPhoto();
        this.uploadServer();
        // this.uploadDirect();
    };

    /**
     * 上传手机相册图片
     * @return {[type]} [description]
     */
    Photo.uploadPhoto = function() {
        $(".photoInput").off("change").on("change", function(e) {
            console.log('change..');
            uploadImage(this, 'm-img-list');
            this.outerHTML = this.outerHTML;
        });
    };

    /**
     * 直传
     */
    Photo.uploadDirect = function() {
        var that = this;
        $(".photoInput").off("change").on("change", function(e) {
            if (this.files.length > 0) {
                var file = this.files[0];
                console.log(file);
                $('.preload').show();
                var fileName = file.name.split('.')[0],
                   suffix = file.name.split('.')[1],
                  key = fileName+new Date().getTime()+"."+suffix;
                  console.log(key)
                that.getToken(function(data) {
                    that.Qiniu_upload(file, data.uptoken,key );
                });
            } else {
                $('.preload').hide();
                console && console.log("form input error");
            }
        });
    };

    /**
     * 七牛直传接口
     *
     * @class      Qiniu_upload (name)
     * @param      {<type>}  f       { parameter_description }
     * @param      {<type>}  token   The token
     * @param      {<type>}  key     The key
     */
    Photo.Qiniu_upload = function(f, token, key) {
        var Qiniu_UploadUrl = "http://up.qiniu.com";
        var xhr = new XMLHttpRequest();
        xhr.open('POST', Qiniu_UploadUrl, true);
        var formData, startDate;
        formData = new FormData();
        if (key !== null && key !== undefined) formData.append('key', key);
        formData.append('token', token);
        formData.append('file', f);
        var taking;
        xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                var nowDate = new Date().getTime();
                taking = nowDate - startDate;
                var x = (evt.loaded) / 1024;
                var y = taking / 1000;
                var uploadSpeed = (x / y);
                var formatSpeed;
                if (uploadSpeed > 1024) {
                    formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
                } else {
                    formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
                }
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                console && console.log(percentComplete, ",", formatSpeed);
            }
        }, false);
        xhr.timeout = 20000;  
        xhr.ontimeout = timeout; 
        xhr.onreadystatechange = function(response) {
            if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                var blkRet = JSON.parse(xhr.responseText);
                console && console.log(blkRet);
                console.log(xhr.responseText);
                var res = $.parseJSON(xhr.responseText);
                url = "http://7xpgeq.com1.z0.glb.clouddn.com/" + encodeURI(res.key);
                console.log(url);
                var img = "<img src='" + url + "?imageView2/1/q/30' class='m-source m-image' type='photo'>";
                temp += img;
                $('.m-content').html(temp);
                $('.preload').hide();
                Photo._init();
                mEvent.listen._imageSelect();
            } else if (xhr.status != 200 && xhr.responseText) {
                $('.preload').hide();
            }
        };

        function timeout(){
          console.log("请求超时!")
          $('.preload').hide();
        }
        startDate = new Date().getTime();
        xhr.send(formData);
    };

    /**
     * 跨域获取token值
     *
     * @param      {Function}  callback  The callback
     */
    Photo.getToken = function(callback) {
        $.ajax({
            type: "get",
            url: "http://demo.timepack.cn/qiniu/getToken",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function(json) {
                callback(json)
            }
        });
    }

    /**
     * 上传到服务器
     */
    Photo.uploadServer = function() {
        //跨域获取token
        $.ajax({
            type: "get",
            url: "http://demo.timepack.cn/qiniu/getToken",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function(json) {
                console.log(json.uptoken);
                Qiniu.uploader({
                    runtimes: 'html5,flash,html4',
                    browse_button: 'uploader',
                    flash_swf_url: '',
                    chunk_size: '4mb',
                    uptoken: json.uptoken,
                    domain: 'http://qiniu-plupload.qiniudn.com/',
                    flash_swf_url: './lib/Moxie.swf',
                    unique_names: true,
                    get_new_uptoken: false,
                    auto_start: true,
                    log_level: 5,
                    filters: {
                        mime_types: [ // 只允许上传图片和zip文件
                            {
                                title: "Image files",
                                extensions: "jpg,gif,png,jpeg"
                            }
                        ],
                        max_file_size: '10mb'
                            // 不允许选取重复文件
                    },
                    init: {
                        'FilesAdded': function(up, files) {},
                        'BeforeUpload': function(up, file) {},
                        'UploadProgress': function(up, file) {
                            $('.preload').show();
                        },
                        'UploadComplete': function() {},
                        'FileUploaded': function(up, file, info) {
                            var url = "";
                            var res = $.parseJSON(info);
                            url = "http://7xpgeq.com1.z0.glb.clouddn.com/" + encodeURI(res.key);
                            console.log(url);
                            var img = "<img src='" + url + "?imageView2/1/q/30' class='m-source m-image' type='photo'>";
                            temp += img;
                            $('.m-content').html(temp);
                            $('.preload').hide();
                            Photo._init();
                            mEvent.listen._imageSelect();
                        },
                        'Error': function(up, err, errTip) {
                            if (err.code == -600) {
                                layer.alert('图片大小超过限制~');
                            }
                        }
                    }
                });
            },
            error: function() {
                alert("请求出错！");
            }
        });

    };

    /**
     * 上传本地图片
     * @param  {[obejct]} fileObj   [文件对象]
     * @param  {[type]} previewId [预览id]
     * @return {[type]}
     */
    var uploadImage = function(fileObj, previewId) {
        $('.preload').show();
        var allowExtention = ".jpg,.bmp,.gif,.png,.jpeg"; //允许上传文件的后缀名
        var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
        var browserVersion = window.navigator.userAgent.toUpperCase();
        var p = require('../tool/popup'),
            Popup = new p();
        if (allowExtention.indexOf(extention) > -1) {
            //兼容chrome、火狐7+、360浏览器5.5+等,兼容ie10，HTML5实现预览
            if (fileObj.files) {
                if (window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        imageCompress(e.target.result, function(path) {
                            setTimeout(function() {
                                showPreviewImage($(fileObj).attr("role"), path);
                                $('.preload').hide();
                            }, 2000);
                        });
                    };
                    try {
                        reader.readAsDataURL(fileObj.files[0]);
                    } catch (e) {
                        console.log(e);
                        $.hidePreloader();
                        return;
                    }
                } else {
                    $('.preload').hide();
                    Popup.alert('', "不支持该图片类型!");
                    return;
                }
            }
        } else {
            $('.preload').hide();
            Popup.alert('', "不支持该图片类型!");
            return;
        }
    };

    /**
     * 图片上传成功后的引导
     * @param img
     */
    var showPreviewImage = function(role, img) {
        //1.添加预览图片进缓存
        var img = "<img src='" + img + "' class='m-source m-image' type='photo'>";
        if (temp == "") {
            temp += "<a class='m-source m-image m-add'></a>" +
                "<input type='file' class='upload photoInput' accept='image/*' role='design'>";
        }
        temp += img;
        if (role == 'index') {
            //2.设计器加载该图片
            var i = require('../image/image'),
                Picture = new i();
            Picture.drawImage($(img));
            //TODO
            //3.隐藏初始化界面
            $('.m-index').hide();
            //4.显示默认效果界面
            //$('.m-effect').show();
            resetEffectPage();
        } else {
            $('.m-content').html(temp);
            Photo._init();
            mEvent.listen._imageSelect();
        }
    };

    var resetEffectPage = function() {
        /*    var $a = $('.m-effect').find('.effects a');
            var width = $a.width();
            var lineHeight = width+'px';
            $a.css({'height':width,'line-height':lineHeight});*/
        mEvent.listen._effectSelect();
        mEvent.listen._init();
    };

    /**
     * 图片压缩
     * @param callback
     */
    var imageCompress = function(url, callback) {
        var $img = $('<img>');
        $img.on('load', function() {
            var square = 700,
                percent, imageWidth, imageHeight;
            var medium = document.getElementById('medium');

            if (this.width > this.height) {
                percent = this.height / square,
                    imageWidth = this.width / percent,
                    imageHeight = square;
            } else {
                percent = this.width / square,
                    imageWidth = square,
                    imageHeight = this.height / percent;
            }

            medium.width = imageWidth;
            medium.height = imageHeight;

            var context = medium.getContext('2d');
            context.clearRect(0, 0, imageWidth, imageHeight);
            var offsetX = 0;
            var offsetY = 0;
            context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
            var data = medium.toDataURL('image/jpeg');
            callback(data);
        });
        $img.attr('src', url);
    }
});
