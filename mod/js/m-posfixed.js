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
                }   //鍙宠竟璺熼殢

                // tab 澶撮儴
                // && scrollTop <= headerTop  + $(".pd-box").outerHeight() - 5
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
                    $('html,body').animate({'scrollTop':ScrollDistance- $(settings.padtabBox).outerHeight()},200);  //婊氬姩鍒版爣棰樹綅缃�
                }else {
                    $('html,body').animate({'scrollTop':ScrollDistance- $(settings.padtabBox).outerHeight()-($(settings.Mheader).outerHeight()|| 0)},200);  //婊氬姩鍒版爣棰樹綅缃�
                }
            })

        }
    });


})(jQuery);
// $('.pd-main') 浜у搧鍖呰９鏈€澶栧眰 绫诲悕鍙浛鎹�

// $('.pd-main').posfixed({
//     top : "0",
//     left:"",
//     right:"0",
//     zIndex:"",
//     scrollLI:".pd-edit",  // 姣忎釜閫夐」
//     rightName:".pd-bar01",  //鍙宠竟璺熼殢鐨勭洅瀛�
//     pdBoxInclusion:".pd-box", // 鍖呰９澶撮儴鍜屽唴瀹圭殑鐖剁骇
//     padtabBox:".pdTab-box", // 澶撮儴鐖剁骇
//     barFixedTop:$(".pdTab-box").outerHeight(),//1.barFixedTop: $(".pdTab-box").outerHeight()  閰嶇疆鍙宠竟鐩掑瓙鐨勫湪璺熼殢婊氬姩鏃惰窛绂婚《閮ㄧ殑璺濈锛屼笉閰嶇疆鍒欐槸0銆�
//     // fixedTop: $(".pdTab-box").outerHeight() // 1.fixedTop: $(".pdTab-box").outerHeight()  閰嶇疆澶撮儴璺熼殢婊氬姩鏃惰窛绂婚《閮ㄧ殑璺濈锛屼笉閰嶇疆鍒欐槸0锛岄厤缃ご閮ㄧ殑璇�,闇€瑕侀厤缃ご閮ㄥ湪鍝釜鍏冪礌涓嬬殑绫诲悕銆�
//     // Mheader:".aaaaa"  璺熼厤缃ご閮ㄨ繛鐫€鐢紝濡傛灉澶撮儴娌℃湁閰嶇疆璺濈锛屽垯姝ら厤缃棤闇€閰嶇疆锛屽鏋滈厤缃簡锛屽ご閮ㄧ殑璺濈锛屼笖澶т簬0鏃讹紝闇€瑕佸湪杩欓噷鍐欎笂鍦ㄥご閮ㄤ笂鏂圭殑鍏冪礌鐨勭被鍚嶏紝鍚﹀垯绉诲姩鏃朵細鎸′綇涓€浜涙爣棰樸€�
// });


// // 2.濡傛灉闇€瑕佷釜鍒笉鍦ㄦ暣涓粨鏋勯噷鐨勫唴瀹广€傚崟鐙粰鍦ㄧ粨鏋勫鐨勫唴瀹规坊鍔犵被鍚嶃€�
// // 3.濡傛灉鍙娇鐢ㄥ彸杈圭殑鐩掑瓙璺熼殢鍔熻兘锛岀粨鏋勯噷鐨勫ご閮ㄥ拰鍚勪釜瀵瑰簲鐨勫唴瀹逛笉鍐欙紝鏈€澶栧眰鐨� pd-main pd-box 闇€瑕佸啓銆�