
(function ($) {
    $.extend($.fn, {
        posfixed: function (configSettings) {
            var settings = {
                direction: "top",
                type: "while",
                hide: false,
                distance: 0,
                left: 0,
                rightName: ".pd-bar"
            };
            $.extend(settings, configSettings);
            var pic_wrap = $(".pd-main").offset().top;
            var tabContent = $(".pd-box").outerHeight();
            var headerTop = $(".pdTab-box").offset().top;
            if($(settings.rightName).length > 0){
                var obj = $(settings.rightName);
                var initPos = $(obj).offset().top;
                var left = (document.body.clientWidth - $(".pd-main").outerWidth()) / 2 + $(".pd-box").outerWidth() + ($(".pd-main").outerWidth() - $(".pd-box").outerWidth() - $(obj).outerWidth());
            }
            window.onresize = function () {
                if($(settings.rightName).length > 0){
                    left = (document.body.clientWidth - $(".pd-main").outerWidth()) / 2 + $(".pd-box").outerWidth() + ($(".pd-main").outerWidth() - $(".pd-box").outerWidth() - $(obj).outerWidth());
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (scrollTop >= initPos && scrollTop < pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        if (document.body.clientWidth - $(".pd-main").outerWidth() <= 0) {
                            $(obj).css({
                                "left": ($(".pd-main").outerWidth() - $(".pd-box").outerWidth() - $(obj).outerWidth()) + $(".pd-box").outerWidth()
                            });

                        } else {
                            $(obj).css({
                                "left": left
                            });
                        }
                    } else if (scrollTop >= pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        $(obj).css({
                            "left": left - (document.body.clientWidth - $(".pd-main").outerWidth()) / 2
                        });

                    } else {
                        $(obj).css({
                            "left": left - (document.body.clientWidth - $(".pd-main").outerWidth()) / 2
                        });
                    }
                }
            };
            $(window).scroll(function () {
                var tabContent = $(".pd-box").outerHeight();
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if ($(settings.rightName).length > 0 && $(settings.rightName).outerHeight() < document.body.clientHeight) {
                    if (scrollTop >= initPos && scrollTop < pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        $(obj).css({
                            "position": "fixed",
                            "top":  $(".pdTab-box").outerHeight(),
                            "zIndex": settings.zIndex || "",
                            "left": left
                        });
                    } else if (scrollTop >= pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        $(obj).css({
                            "position": "absolute",
                            "top": tabContent - $(obj).outerHeight(),
                            "zIndex": settings.zIndex || "",
                            "left": left - (document.body.clientWidth - $(".pd-main").outerWidth()) / 2

                        })
                    } else {
                        $(obj).css({
                            "position": "absolute",
                            "top": "0",
                            "left": left - (document.body.clientWidth - $(".pd-main").outerWidth()) / 2

                        })
                    }
                }   //右边跟随

                // tab 头部
                if (scrollTop >=  headerTop  + $(".pdTab-box").outerHeight() && scrollTop <= headerTop  + $(".pd-box").outerHeight() - 5) {
                    $(".pdTab-box").css({
                        "position": "fixed",
                        "top": settings.top || "0",
                        "zIndex": settings.zIndex || ""
                    })

                } else {
                    $(".pdTab-box").css({"position": "absolute"})
                }

                if (scrollTop <= $(".pdCont").find(".pd-edit").eq(1).offset().top- $(".pdTab-box").outerHeight()) {
                    $(".pdTab-box").find("li").eq(0).addClass("active").siblings().removeClass("active")

                 }

                for(var i = 0; i < $(".pdTab-box").find("li").length;i++){
                    if(i > 0 && i <=  $(".pdTab-box").find("li").length-2){
                        if (scrollTop >= $(".pdCont").find(".pd-edit").eq(i).offset().top- $(".pdTab-box").outerHeight()-2 && scrollTop < $(".pdCont").find(".pd-edit").eq(i+1).offset().top- $(".pdTab-box").outerHeight()) {
                            $(".pdTab-box").find("li").eq(i).addClass("active").siblings().removeClass("active")
                        }
                    }

                }
                if ( scrollTop >= $(".pdCont").find(".pd-edit").eq($(".pdTab-box").find("li").length-1).offset().top- $(".pdTab-box").outerHeight()-2) {
                    $(".pdTab-box").find("li").eq($(".pdTab-box").find("li").length-1).addClass("active").siblings().removeClass("active")
                 }

            });

            $(".pdTab-box").on("click","li",function (e) {
                e.stopPropagation();
                var index = $(this).index();
                var ScrollDistance = $(".pdCont").find(".pd-edit").eq(index).offset().top;
                $('html,body').animate({'scrollTop':ScrollDistance- $(".pdTab-box").outerHeight()},200);  //滚动到标题位置

            })

        }
    });


})(jQuery);
