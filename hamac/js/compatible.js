 //根据设备加载不同的样式
 var setStyle = function(cssArr){
  var i= 0,len = cssArr.length;
  for(i;i<len;i++){
      document.write('<link href="'+cssArr[i]+'" type="text/css" rel=stylesheet>');
  }
};
// 判断是否移动端
function goPAGE() {
  if (
    (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))
  ) {
      // window.location.href="移动端url";
      alert("mobile");
      //判断访问环境是 移动端 则加载以下样式
      // setStyle(['css/public/base.css','css/layout.css','css/home.css']);
  }
  else {
      // window.location.href="pc端url"; 
      alert("pc")
      //否则加载pc端样式
      setStyle(['css/index.css']);

  }
}
goPAGE();        // 调用function