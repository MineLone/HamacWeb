$(".news-det-font span").click(function(){
    var ind = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
});
$(".foot-s").click(function(){
    $(".technical-det-text p").css("font-size",16);
});
$(".foot-m").click(function(){
    $(".technical-det-text p").css("font-size",18);
});
$(".foot-l").click(function(){
    $(".technical-det-text p").css("font-size",20);
});

$(".partners-tablist li").mouseenter(function() {
    var ind = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".inb5-tabitem").eq(ind).addClass("active").siblings().removeClass("active");
})