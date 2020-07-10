

/*var $this = $(this);
var lse = $(this).find('.videoPag-img');
var jusy = lse.find('.smTime').text();*/

function formatSeconds(value) {
    var secondTime = parseInt(value);
    var minuteTime = 0;
    var hourTime = 0;
    if(secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if(minuteTime > 60) {
            hourTime = parseInt(minuteTime / 60);
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "秒";

    if(minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    /*if(hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
    }*/
    return result;
}
var btns= [];
$('.smTime').each(function(key,value){

    btns[key] = $(this).text();
    console.log(btns[key]);
    formatSeconds();
    $(this).text(formatSeconds(btns[key]));

});
/*$this.find('.smTime').text(formatSeconds(jusy));
console.log(formatSeconds(jusy));*/
if ($('.ue-nav_t72').length) {
    new IScroll('.ue-nav_t72', {
        scrollX: true,
        scrollY: false,
        click: true,
        preventDefault: false
    });
}

var looScroll = $(".videoDetail-pag");
var fil = $('.ue-nav_t72').find('li').eq(0);
/*$('.cuose').prependTo($(".ue-nav_t72 .nav-list"));*/
fil.after($(".cuose"));
/*$('.cuest').prependTo(looScroll);*/
if ($('.video-container').length) {
    onload = function () {
        //初始化
        scrollToLocation();
    };
}
/*looScroll.scrollTop(looScroll.scrollTop() + $('.cuest').offset().top - looScroll.offset().top); */ //滚动到指定位置
if ($('.video-container').length) {
looScroll.animate({ scrollTop: looScroll.scrollTop() + $('.cuest').offset().top - looScroll.offset().top }, 1000);
}
if ($('.cuest').length) {
    looScroll.niceScroll({
        cursorcolor: "rgba(153,153,153,0.3)",
        cursoropacitymax: 1,
        touchbehavior: false,
        cursorwidth: "6px",
        scrollspeed: 40,
        cursorborder: "0",
        background: 'rgba(230,230,230,0.5)',
        cursorborderradius: "10px",
        railpadding: {
            top: 40,
            right: 4,
            left: 4,
            bottom: 4
        },
        autohidemode: false
    });
}
$(document).ready(function(){
    $(".smTime").fadeIn(800);
    $(".bz-bz").fadeIn(1400);
})
