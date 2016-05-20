/**
 * 字体模块
 * @param  {[type]} require     [description]
 * @param  {[type]} exports     [description]
 * @param  {[type]} module){} [description]
 * @return {[type]}             [description]
 */
define(function(require,exports,module){function Font(){}module.exports=Font,Font.prototype.drawFont=function(type,text){var iText=new fabric.IText("新年快乐",{left:canvas.width/4,top:canvas.height/4,fontFamily:type,angle:0,caching:!1,fontSize:30,fill:"red",editable:!1});canvas.add(iText),canvas.renderAll()}});