/**
 * 弹框插件模块
 * @author zy
 */
define(function(require,exports,module){

    module.exports = Popup;

    function Popup(){};

    Popup.prototype = {

        prepare : function(type,title){
            var $popup = $('<div class="m-layer popup" role="alert"></div>'),
                $container = $('<div class="popup-container"></div>'),
                $p = $('<p>'+title+'</p>'),
                $ul = $('<ul class="popup-btns clearfix"><li><a href="#" role="confirm">确认</a></li><li><a href="#" role="close">取消</a></li></ul>'),
                $ul2 = $('<ul class="popup-btns clearfix"><li class="ensure"><a href="#" role="close">确认</a></li></ul>'),
                $close = $('<a href="#" class="popup-close img-replace" role="close">Close</a>');
            $popup.html($container);
            if(type == 'confirm'){
                $container.append($p).append($ul).append($close);
            }else{
                $container.append($p).append($ul2).append($close);
            }
            return $popup;
        },

        response: function(callback){
            var $popup = $('.popup');
            $popup.find('a').on('click',function(e){
                var role = $(this).attr('role');
                if(role == 'confirm'){
                    $popup.remove();
                    callback();
                }else if(role == 'close'){
                    $popup.remove();
                }
            });
        },

        alert : function(type,title,callback){
            if($('.popup').length>0){
                $('.popup').remove();
            }
            $('body').append(this.prepare(type, title));
            this.response(callback);
        }
    }
});