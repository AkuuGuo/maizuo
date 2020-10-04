// 移动端适配方案：以750px设计稿为基准，1rem = 100px。eg：font-size: 0.32rem;(字体大小为32px)。
// (function (document, window) {
//   var designWidth = 750 // 设计稿宽度，需根据设计稿进行调整。
//   document.documentElement.style.fontSize = document.documentElement.clientWidth / designWidth * 100 + 'px'
//   window.onresize = function () {
//     document.documentElement.style.fontSize = document.documentElement.clientWidth / designWidth * 100 + 'px'
//   }
// }(document, window))
function setHtmlFontSize () {
  var designWidth = 375 // 设计稿宽度  html font-size: 100px
  var deviceWidth = document.documentElement.clientWidth // 设备宽度
  document.documentElement.style.fontSize = deviceWidth / designWidth * 100 + 'px'
}
setHtmlFontSize()
window.onresize = function () {
  setHtmlFontSize()
}
