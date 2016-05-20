/**
 * 数据模块
 * @param  {[type]} require     [description]
 * @param  {[type]} exports     [description]
 * @param  {[type]} module){} [description]
 * @return {[type]}             [description]
 */
define(function (require, exports, module) {

  var Data = {};

  module.exports = Data;

  //local
  Data.root = './images/';



  /**
   * 按钮组常量数据
   * @type {Object}
   */
  Data.toolbarName = {
    //图片按钮
    "PICTURE": "picture",
    //字体按钮
    "FONT": "font",
    //装饰
    "DECORATION": "decoration",
    //模板
    "TEMPLATE": "template",
    //背景
    "BACKGROUND": "background"
  };

  /**
   * 字体数据
   * @type {Array}
   */
  Data.fonts = [
    Data.root + "font/f1.png",
    Data.root + "font/f2.png",
    Data.root + "font/f3.png",
    Data.root + "font/f4.png",
    Data.root + "font/f5.png",
    Data.root + "font/f6.png",
    Data.root + "font/f7.png",
    Data.root + "font/f8.png",
    Data.root + "font/f9.png",
    Data.root + "font/f10.png",
    Data.root + "font/f11.png",
    Data.root + "font/f12.png",
    Data.root + "font/f13.png",
    Data.root + "font/f14.png",
    Data.root + "font/f15.png",
    Data.root + "font/f16.png",
    Data.root + "font/f17.png",
    Data.root + "font/f18.png",
    Data.root + "font/f19.png",
    Data.root + "font/f20.png",
    Data.root + "font/f21.png",
    Data.root + "font/f22.png",
    Data.root + "font/f23.png",
    Data.root + "font/f24.png",
    Data.root + "font/f25.png",
    Data.root + "font/f26.png",
    Data.root + "font/f27.png",
    Data.root + "font/f28.png",
    Data.root + "font/f29.png",
    Data.root + "font/f30.png",
    Data.root + "font/f31.png",
    Data.root + "font/f32.png",
    Data.root + "font/f33.png",
    Data.root + "font/f34.png",
    Data.root + "font/f35.png",
    Data.root + "font/f36.png",
    Data.root + "font/f37.png",
    Data.root + "font/f38.png",
    Data.root + "font/f39.png",
    Data.root + "font/f40.png",
    Data.root + "font/f41.png",
    Data.root + "font/f42.png",
    Data.root + "font/f43.png",
    Data.root + "font/f44.png",
    Data.root + "font/f45.png",
    Data.root + "font/f46.png",
    Data.root + "font/f47.png",
    Data.root + "font/f48.png",
    Data.root + "font/f49.png",
    Data.root + "font/f50.png"
  ];

  /**
   * 装饰数据
   * @type {Array}
   */
  Data.decoration = [
    Data.root + "decoration/d1.png",
    Data.root + "decoration/d2.png",
    Data.root + "decoration/d3.png",
    Data.root + "decoration/d4.png",
    Data.root + "decoration/d5.png",
    Data.root + "decoration/d6.png",
    Data.root + "decoration/d7.png",
    Data.root + "decoration/d8.png",
    Data.root + "decoration/d9.png",
    Data.root + "decoration/d10.png",
    Data.root + "decoration/d11.png",
    Data.root + "decoration/d12.png",
    Data.root + "decoration/d13.png",
    Data.root + "decoration/d14.png",
    Data.root + "decoration/d15.png",
    Data.root + "decoration/d16.png",
    Data.root + "decoration/d17.png",
    Data.root + "decoration/d18.png",
    Data.root + "decoration/d19.png",
    Data.root + "decoration/d20.png",
    Data.root + "decoration/d21.png",
    Data.root + "decoration/d22.png",
    Data.root + "decoration/d23.png",
    Data.root + "decoration/d24.png",
    Data.root + "decoration/d25.png",
    Data.root + "decoration/d26.png",
    Data.root + "decoration/d27.png",
    Data.root + "decoration/d28.png",
    Data.root + "decoration/d29.png",
    Data.root + "decoration/d30.png",
    Data.root + "decoration/d31.png",
    Data.root + "decoration/d32.png",
    Data.root + "decoration/d33.png",
    Data.root + "decoration/d34.png",
    Data.root + "decoration/d35.png",
    Data.root + "decoration/d36.png",
    Data.root + "decoration/d37.png",
    Data.root + "decoration/d38.png",
    Data.root + "decoration/d39.png",
    Data.root + "decoration/d40.png",
    Data.root + "decoration/d41.png",
    Data.root + "decoration/d42.png",
    Data.root + "decoration/d43.png",
    Data.root + "decoration/d44.png",
    Data.root + "decoration/d45.png",
    Data.root + "decoration/d46.png",
    Data.root + "decoration/d47.png",
    Data.root + "decoration/d48.png",
    Data.root + "decoration/d49.png",
    Data.root + "decoration/d50.png",
    Data.root + "decoration/d51.png",
    Data.root + "decoration/d52.png",
    Data.root + "decoration/d53.png",
    Data.root + "decoration/d54.png",
    Data.root + "decoration/d55.png",
    Data.root + "decoration/d56.png",
    Data.root + "decoration/d57.png",
    Data.root + "decoration/d58.png",
    Data.root + "decoration/d59.png",
    Data.root + "decoration/d60.png"
  ];

  /**
   * 滤镜数据
   * @type {string[]}
   */
  Data.filter = [{
    "name":"none",
    "url":Data.root+"filter/1.png"
  },{
    "name":"grayscale",
    "url":Data.root+"filter/2.png"
  },{
    "name":"sepia",
    "url":Data.root+"filter/3.png"
  },{
    "name":"sepia2",
    "url":Data.root+"filter/4.png"
  },{
    "name":"blend",
    "url":Data.root+"filter/5.png"
  }];

  /**
   * 卡通合影
   * @type {*[]}
   */
  Data.cartoonGroup =[
    Data.root+"ctgroup/1.png",
    Data.root+"ctgroup/2.png",
    Data.root+"ctgroup/4.png",
    Data.root+"ctgroup/5.png",
    Data.root+"ctgroup/6.png",
    Data.root+"ctgroup/7.png",
    Data.root+"ctgroup/8.png",
    Data.root+"ctgroup/9.png",
    Data.root+"ctgroup/10.png",
    Data.root+"ctgroup/11.png",
    Data.root+"ctgroup/12.png",
    Data.root+"ctgroup/13.png",
    Data.root+"ctgroup/14.png",
    Data.root+"ctgroup/15.png",
    Data.root+"ctgroup/16.png",
    Data.root+"ctgroup/17.png",
    Data.root+"ctgroup/18.png",
    Data.root+"ctgroup/19.png",
    Data.root+"ctgroup/20.png",
    Data.root+"ctgroup/21.png",
    Data.root+"ctgroup/22.png",
    Data.root+"ctgroup/23.png",
    Data.root+"ctgroup/24.png",
    Data.root+"ctgroup/25.png",
    Data.root+"ctgroup/26.png",
    Data.root+"ctgroup/27.png",
    Data.root+"ctgroup/28.png",
    Data.root+"ctgroup/29.png",
    Data.root+"ctgroup/30.png",
    Data.root+"ctgroup/31.png",
    Data.root+"ctgroup/32.png",
    Data.root+"ctgroup/33.png",
    Data.root+"ctgroup/34.png",
    Data.root+"ctgroup/35.png",
    Data.root+"ctgroup/36.png",
    Data.root+"ctgroup/37.png"
  ];

  /**
   * 卡通变身
   * @type {*[]}
   */
  Data.cartoonChange = [
    Data.root+"ctchange/2.png",
    Data.root+"ctchange/3.png",
    Data.root+"ctchange/4.png",
    Data.root+"ctchange/5.png",
    Data.root+"ctchange/6.png",
    Data.root+"ctchange/7.png"
  ];

  /**
   * 唯美相框
   * @type {*[]}
   */
  Data.photoFrame = [
    Data.root+"frame/1.png",
    Data.root+"frame/2.png",
    Data.root+"frame/3.png",
    Data.root+"frame/4.png",
    Data.root+"frame/5.png",
    Data.root+"frame/6.png",
    Data.root+"frame/7.png",
    Data.root+"frame/8.png",
    Data.root+"frame/9.png",
    Data.root+"frame/10.png",
    Data.root+"frame/11.png",
    Data.root+"frame/12.png",
    Data.root+"frame/13.png",
    Data.root+"frame/14.png",
    Data.root+"frame/15.png",
    Data.root+"frame/16.png",
    Data.root+"frame/17.png",
    Data.root+"frame/18.png",
    Data.root+"frame/19.png",
    Data.root+"frame/20.png",
    Data.root+"frame/21.png"
  ];
});
