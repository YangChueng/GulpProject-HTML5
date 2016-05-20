/**
 * 字体模块
 * @param  {[type]} require     [description]
 * @param  {[type]} exports     [description]
 * @param  {[type]} module){} [description]
 * @return {[type]}             [description]
 */
define(function(require, exports, module) {

  /**
   * 对外暴露模块对象
   * @type {[type]}
   */
  module.exports = Font;

  /**
   *
   * @constructor
   */
  function Font() {}

  /**
   * 字体绘制
   * @param type
   * @param text
   */
  Font.prototype.drawFont = function(type, text) {
    var iText = new fabric.IText('新年快乐', {
      left: canvas.width/4,
      top: canvas.height/4,
      fontFamily: type,
      angle: 0,
      caching: false,
      fontSize:30,
      fill:'red',
      editable:false
    });
    canvas.add(iText);
    canvas.renderAll();
  };
});
