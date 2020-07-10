/**
 * create by xh
 */

(function ($) {
    $.extend($.fn, {
        posfixed: function (configSettings) {
            var settings = {
                direction: "top",
                type: "while",
                hide: false,
                distance: 0,
                left: 0,
                fixedTop: "0",
                rightName: ".pd-bar"
            };
            $.extend(settings, configSettings);
            var _this = $(this);
            var pic_wrap = _this.offset().top;

            var tabContent = $(settings.pdBoxInclusion).outerHeight();
            var headerTop = $(settings.padtabBox).offset().top;
            if($(settings.rightName).length > 0){
                var obj = $(settings.rightName);
                var initPos = $(obj).offset().top;
                var left = (document.body.clientWidth - _this.outerWidth()) / 2 +  $(settings.pdBoxInclusion).outerWidth() + (_this.outerWidth() - $(settings.pdBoxInclusion).outerWidth() - $(obj).outerWidth());
            }
            window.onresize = function () {
                if($(settings.rightName).length > 0){
                    left = (document.body.clientWidth - _this.outerWidth()) / 2 +  $(settings.pdBoxInclusion).outerWidth() + (_this.outerWidth() -  $(settings.pdBoxInclusion).outerWidth() - $(obj).outerWidth());
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (scrollTop >= initPos && scrollTop < pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        if (document.body.clientWidth -_this.outerWidth() <= 0) {
                            $(obj).css({
                                "left": (_this.outerWidth() -  $(settings.pdBoxInclusion).outerWidth() - $(obj).outerWidth()) +  $(settings.pdBoxInclusion).outerWidth()
                            });

                        } else {
                            $(obj).css({
                                "left": left
                            });
                        }
                    } else if (scrollTop >= pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        $(obj).css({
                            "left": left - (document.body.clientWidth - _this.outerWidth()) / 2
                        });

                    } else {
                        $(obj).css({
                            "left": left - (document.body.clientWidth - _this.outerWidth()) / 2
                        });
                    }
                }
            };
            $(window).scroll(function () {
                var tabContent =  $(settings.pdBoxInclusion).outerHeight();
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if ($(settings.rightName).length > 0 && $(settings.rightName).outerHeight() < document.body.clientHeight) {
                    if (scrollTop >= initPos && scrollTop < pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        $(obj).css({
                            "position": "fixed",
                            "top":  settings.barFixedTop,
                            "zIndex": settings.zIndex || "",
                            "left": left
                        });
                    } else if (scrollTop >= pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        $(obj).css({
                            "position": "absolute",
                            "top": tabContent - $(obj).outerHeight(),
                            "zIndex": settings.zIndex || "",
                            "left": left - (document.body.clientWidth - _this.outerWidth()) / 2

                        })
                    } else {
                        $(obj).css({
                            "position": "absolute",
                            "top": "0",
                            "left": left - (document.body.clientWidth - _this.outerWidth()) / 2

                        })
                    }
                }   //閸欏疇绔熺捄鐔兼

                // tab 婢舵挳鍎?                // && scrollTop <= headerTop  + $(".pd-box").outerHeight() - 5
                if (scrollTop >=  headerTop-$(".wsc-TopCon").outerHeight()  && scrollTop <= $(settings.scrollLI).eq($(settings.scrollLI).length-1).offset().top+ $(settings.scrollLI).eq($(settings.scrollLI).length-1).outerHeight() - 5) {
                    $(settings.padtabBox).css({
                        "position": "fixed",
                        "top": settings.fixedTop || "0",
                        "zIndex": settings.zIndex || ""
                    })

                } else {
                    $(settings.padtabBox).css({"position": "absolute",top:"0"})
                }

                if( $(settings.scrollLI).length){
                    for(var i = 0; i < $(settings.padtabBox).find("li").length;i++){
                        if(i === 0){
                            if (scrollTop <= $(settings.scrollLI).eq(1).offset().top- $(settings.padtabBox).outerHeight()) {
                                $(settings.padtabBox).find("li").eq(0).addClass("active").siblings().removeClass("active")

                            }
                        }else if(i > 0 && i <=  $(settings.padtabBox).find("li").length-2){
                            if (scrollTop >= $(settings.scrollLI).eq(i).offset().top- $(settings.padtabBox).outerHeight()-2-($(settings.Mheader).outerHeight()|| 0) && scrollTop < $(settings.scrollLI).eq(i+1).offset().top- $(settings.padtabBox).outerHeight()+($(settings.Mheader).outerHeight()|| 0)) {
                                $(settings.padtabBox).find("li").eq(i).addClass("active").siblings().removeClass("active")
                            }
                        }else {
                            if ( scrollTop >= $(settings.scrollLI).eq($(settings.padtabBox).find("li").length-1).offset().top- $(settings.padtabBox).outerHeight()-2-($(settings.Mheader).outerHeight()|| 0)) {
                                $(settings.padtabBox).find("li").eq($(settings.padtabBox).find("li").length-1).addClass("active").siblings().removeClass("active")
                            }
                        }

                    }
                }

            });

            $(settings.padtabBox).on("click","li",function (e) {
                e.stopPropagation();
                var index = $(this).index();
                var ScrollDistance = $(settings.scrollLI).eq(index).offset().top;
                if(index === 0){
                    $('html,body').animate({'scrollTop':ScrollDistance- $(settings.padtabBox).outerHeight()},200);  //濠婃艾濮╅崚鐗堢垼妫版ü缍呯純锟?                }else {
                    $('html,body').animate({'scrollTop':ScrollDistance- $(settings.padtabBox).outerHeight()-($(settings.Mheader).outerHeight()|| 0)},200);  //濠婃艾濮╅崚鐗堢垼妫版ü缍呯純锟?                }
            })

        }
    });


})(jQuery);
// $('.pd-main') 娴溠冩惂閸栧懓锛欓張鈧径鏍х湴 缁鎮曢崣顖涙禌閹癸拷

// $('.pd-main').posfixed({
//     top : "0",
//     left:"",
//     right:"0",
//     zIndex:"",
//     scrollLI:".pd-edit",  // 濮ｅ繋閲滈柅澶愩€?//     rightName:".pd-bar01",  //閸欏疇绔熺捄鐔兼閻ㄥ嫮娲呯€涳拷
//     pdBoxInclusion:".pd-box", // 閸栧懓锛欐径鎾劥閸滃苯鍞寸€瑰湱娈戦悥鍓侀獓
//     padtabBox:".pdTab-box", // 婢舵挳鍎撮悥鍓侀獓
//     barFixedTop:$(".pdTab-box").outerHeight(),//1.barFixedTop: $(".pdTab-box").outerHeight()  闁板秶鐤嗛崣瀹犵珶閻╂帒鐡欓惃鍕躬鐠虹喖娈㈠姘З閺冩儼绐涚粋濠氥€婇柈銊ф畱鐠烘繄顬囬敍灞肩瑝闁板秶鐤嗛崚娆愭Ц0閵嗭拷
//     // fixedTop: $(".pdTab-box").outerHeight() // 1.fixedTop: $(".pdTab-box").outerHeight()  闁板秶鐤嗘径鎾劥鐠虹喖娈㈠姘З閺冩儼绐涚粋濠氥€婇柈銊ф畱鐠烘繄顬囬敍灞肩瑝闁板秶鐤嗛崚娆愭Ц0閿涘矂鍘ょ純顔笺仈闁劎娈戠拠锟?闂団偓鐟曚線鍘ょ純顔笺仈闁劌婀崫顏冮嚋閸忓啰绀屾稉瀣畱缁鎮曢妴锟?//     // Mheader:".aaaaa"  鐠虹喖鍘ょ純顔笺仈闁劏绻涢惈鈧悽顭掔礉婵″倹鐏夋径鎾劥濞屸剝婀侀柊宥囩枂鐠烘繄顬囬敍灞藉灟濮濄倝鍘ょ純顔芥￥闂団偓闁板秶鐤嗛敍灞筋洤閺嬫粓鍘ょ純顔荤啊閿涘苯銇旈柈銊ф畱鐠烘繄顬囬敍灞肩瑬婢堆傜艾0閺冭绱濋棁鈧憰浣告躬鏉╂瑩鍣烽崘娆庣瑐閸︺劌銇旈柈銊ょ瑐閺傚湱娈戦崗鍐閻ㄥ嫮琚崥宥忕礉閸氾箑鍨粔璇插З閺冩湹绱伴幐鈥茬秶娑撯偓娴滄稒鐖ｆ０妯糕偓锟?// });


// // 2.婵″倹鐏夐棁鈧憰浣烽嚋閸掝偂绗夐崷銊︽殻娑擃亞绮ㄩ弸鍕櫡閻ㄥ嫬鍞寸€瑰箍鈧倸宕熼悪顒傜舶閸︺劎绮ㄩ弸鍕樆閻ㄥ嫬鍞寸€硅鍧婇崝鐘佃閸氬秲鈧拷
// // 3.婵″倹鐏夐崣顏冨▏閻劌褰告潏鍦畱閻╂帒鐡欑捄鐔兼閸旂喕鍏橀敍宀€绮ㄩ弸鍕櫡閻ㄥ嫬銇旈柈銊ユ嫲閸氬嫪閲滅€电懓绨查惃鍕敶鐎归€涚瑝閸愭瑱绱濋張鈧径鏍х湴閻拷 pd-main pd-box 闂団偓鐟曚礁鍟撻妴锟?