/**
 * 加载设计器
 */
define(function(require,exports,module){var Loading={};module.exports=Loading;var $=require("zepto");Loading._startLoading=function(){this._resetDesigner()},Loading._resetDesigner=function(){var canvasObj=document.getElementById("designer"),offsetWidth=document.body.offsetWidth,canvasWidth=(document.body.offsetHeight,.55*offsetWidth),canvasHeight=9*canvasWidth/5;$(canvasObj).attr("width",canvasWidth),$(canvasObj).attr("height",canvasHeight),window.canvas=new fabric.Canvas("designer",{allowTouchScrolling:!0});var maskImg="./images/base_iphone6s_177607_gold.png",offsetLeft=canvas.wrapperEl.offsetLeft;$("#mask-img").attr("src",maskImg),$("#mask-img").css({width:canvas.width,height:canvas.height,left:offsetLeft})}});