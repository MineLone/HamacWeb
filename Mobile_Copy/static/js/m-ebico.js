$(function () {
  var $doc = $(document),

    obj = {
      init: function () {
        this.event();
        this.form();
        this.owlEvent();
      },
      event: function () {
        var toph = 0;
        $(" .top-menu").on("click", function (e) {
          $(".wsc-Nav").animate({ right: 0 }, 300);
          toph = $(document).scrollTop();
          setTimeout(function () {
            $("body").css({
              "position": "fixed",
              "top": "-" + toph + "px"
            })
          }, 400)


        });
        $(" .top-lan").on("click",function(e) {
                            $('.lanCont').show();
                        });
                        $(".top-close").on("click",function(e) {
                            // $(".wsc-Nav").animate({right:"-7.5rem"},300);
                            $(this).parent().hide();
                        });
              
				$(" .top-search").on("click",function(e) {
					$('.searCont').show();
				});
				$(".top-close").on("click",function(e) {
					// $(".wsc-Nav").animate({right:"-7.5rem"},300);
					$(this).parent().hide();
				});
        $(".wsc-Nav .top-close").on("click", function (e) {
          $(".wsc-Nav").animate({ right: "-7.5rem" }, 300);

          $("body").css({
            "position": "unset",
            "top": "unset"
          })
          setTimeout(function () {
            $('html,body').animate({ scrollTop: toph }, 0)
          }, 200)
        });
        $(".hn-text span").on("click", function (e) {
          $(this).parents('.hn-item').addClass('active').siblings().removeClass('active');
          $(this).parent().siblings('.hn-drop').slideToggle();
          $(this).toggleClass('rotate180');
          $(this).parents('.hn-item').siblings().find('span').removeClass('rotate180');
          $(this).parents('.hn-item').siblings().find('.hn-drop').slideUp();
        });

        $(".fn-text").on("click", function (e) {
          $(this).siblings('ul').slideToggle();
          $(this).find('span').toggleClass('rotate180');
          $(this).parent('.fn-item').siblings().find('span').removeClass('rotate180');
          $(this).parent('.fn-item').siblings().find('ul').slideUp();
        });

        $(window).scroll(function () {
          if (!$("body").hasClass("no-scroll")) {
            if ($(document).scrollTop() > 10) {
              $(".wsc-TopCon").addClass('wsc-TopConfix');
            } else {
              $(".wsc-TopCon").removeClass('wsc-TopConfix');
            }
          }
        })



        $doc.on("click", ".fm-check ", function () {
          $(this).find('.check-icon').toggleClass("checked");
          if ($(this).find('.check-icon').hasClass("checked")) {
            $(this).find("input[name=isRecive]").val("true")
          } else {
            $(this).find("input[name=isRecive]").val("false")
          }

        })

        // $doc.on("click",".item-check,.td-btn",function(){
        // 	$(this).toggleClass("choosed");
        // 	// if($(this).hasClass("checked")){
        // 	// 	$(this).parents(".fm-check").find("input[name=isRecive]").val("true")
        // 	// }else{
        // 	// 	$(this).parents(".fm-check").find("input[name=isRecive]").val("false")
        // 	// }
        //
        // })

        $(".procomsel-head").click(function () {
          $(this).toggleClass("active");
          $(this).siblings(".procomsel-list").slideToggle();
          $(this).parents(".item").siblings(".item").find(".procomsel-list").slideUp();
          $(this).parents(".item").siblings(".item").find(".procomsel-head").removeClass("active");
        })

        $(".select-panel").on("click", function (e) {
          $(".select-menu").slideToggle();
        });
        $(".select-menu li").on("click", function (e) {
          $(this).addClass('active').siblings().removeClass('active');
          $("input[name=type]").val($(this).data('value'));
          $(".select-panel").text($(this).text());
          $(".select-menu").slideToggle();
        });

        $(".selecte-head .tit").click(function () {
          $(".selecte-head .item-more .list").fadeToggle(250);
          $(this).find(".otharr").toggleClass("rotate180");
        })

        $(".fb-top").click(function () { $('html,body').animate({ 'scrollTop': 0 }) });
        if ($(".sellist-total").length) {
          var listnum1 = 0
          if ($(".resel-list .list-noresult").length) {
            listnum1 = $(".resel-list .list-noresult").length;
          }
          $(".sellist-total").text($(".resel-list .list-item").length - listnum1);
        }


        $(".prol-banText").click(function () {
          $(this).toggleClass("clicking");
        })

      },
      owlEvent: function () {


      },
      form: function () {
        $(".wsc-form input").focus(function () {
          $(this).parent(".fm-item").siblings("label").fadeOut();
        })
        $(".wsc-form input").blur(function () {
          if ($(this).val() == '') {
            $(this).parents(".fm-item").siblings("label").fadeIn();
          } else {
            $(this).parents(".fm-item").siblings("label").fadeOut();
          }
        })
        $(".wsc-form textarea").focus(function () {
          $(this).parent(".fm-item").siblings("label").fadeOut();
        })
        $(".wsc-form textarea").blur(function () {
          if ($(this).val() == '') {
            $(this).parents(".fm-item").siblings("label").fadeIn();
          } else {
            $(this).parents(".fm-item").siblings("label").fadeOut();
          }
        })
        // $('.proDet-form,.serv-form').validator({
        //     fields: {
        //         email: {
        //             rule: 'required,email',
        //             msg: {
        //                 required: 'Please fill in the Email',
        //             }
        // 		},
        //     },
        // });
        $('button[type="submit"]').on('click', function () {
          var nVal = $('input[name="name"]').val()
          var eVal = $('input[name="email"]').val()
          var iVal = $('textarea[name="content"]').val()
          var re = /^[a-zA-Z0-9\.]+@\w+\.\w+$/;
          if (!nVal) {
            alert("Please fill in your name !");
            return false;
          }
          if (!eVal || !re.test(eVal)) {
            alert("Please fill in the right Email address !");
            return false;
          }
          if (!iVal) {
            alert("Please fill in your requirements !");
            return false;
          }
        })



        // $('.comment-form').validator({
        //   fields: {
        //     email: {
        //       rule: 'required,email',
        //       msg: {
        //         required: 'Please fill in the Email',
        //       }
        //     },
        //     rules: {
        //       // tel: [/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,13}$/, 'Please enter the correct mobile number']

        //       tel: [/^[+()\0-9]+$/, 'Please enter the correct mobile number']


        //     },
        //   },
        // });

        // $('.comment-form').on('valid.form', function (e) {
        //   e.preventDefault();
        //   var $form = $(this);
        //   var url = $form.attr('action');
        //   var data = $form.serialize();
        //   $.ajax({
        //     //闃叉鏈嶅姟鍣ㄦ嬁涓嶅埌鏁版嵁
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     url: url,
        //     data: data,
        //     type: 'POST',
        //     success: function (res) {

        //       if (res.status) {
        //         $('.async input[type="text"]').val('');
        //         $('.async textarea').val('');
        //         window.location.href = "/addes/"
        //       } else {
        //         //鎻愪氦澶辫触澶勭悊
        //         alert('FAIL!');
        //       }
        //       //鏇存柊琛ㄥ崟token
        //       var $token = $form.find('#token');
        //       $token.attr('name', res.token.key);
        //       $token.val(res.token.value);
        //     }
        //   })
        // });

      },
    };
  obj.init();
})


var mySwiper1 = new Swiper('.index-banner .swiper-container', {
  autoplay: 3000,
  slide: 1,
  pagination: '.pagination-inban',
  createPagination: false,// 杩欎釜璁剧疆鎴恌alse锛屽垯涓嶄細鑷姩鐢熸垚榛樿鐨勭偣
  paginationClickable: true, // 涓婇潰璁剧疆鎴恌alse鏃讹紝褰撳墠杩欎釜灞炴€у繀椤昏缃垚true,鐐瑰嚮鍒嗛〉鍣ㄧ殑鎸囩ず鐐规椂浼氬彂鐢熸粦鍔ㄥ埌瀵瑰簲鐨勫唴瀹逛笂銆?
  paginationBulletRender: function (swiper, index, className) {
    return '<span class="' + className + '">' + '<i class="dot"></i>' + '</span>';
  },
  loop: true,
});
var mySwiper2 = new Swiper('.inb1-main .swiper-container', {
  autoplay: 3000,
  pagination: '.swiper-pagination',
  createPagination: false,// 杩欎釜璁剧疆鎴恌alse锛屽垯涓嶄細鑷姩鐢熸垚榛樿鐨勭偣
  paginationClickable: true, // 涓婇潰璁剧疆鎴恌alse鏃讹紝褰撳墠杩欎釜灞炴€у繀椤昏缃垚true,鐐瑰嚮鍒嗛〉鍣ㄧ殑鎸囩ず鐐规椂浼氬彂鐢熸粦鍔ㄥ埌瀵瑰簲鐨勫唴瀹逛笂銆?  slidesPerView: 2,
  spaceBetween: 10,
  loop: true,
});
var mySwiper3 = new Swiper('.picd-imglist .swiper-container', {
  slidesPerView: 3,
  // scrollbar:'.swiper-scrollbar',
  // scrollbarHide : false,
  // scrollbarDraggable : true ,
});
if ($('.picd-imglist .swiper-container').length) {
  var act = $('.picd-imglist .swiper-container').find(".active").parent();
  mySwiper3.slideTo(act.index(), 1000, false);
}
var mySwiper4 = new Swiper('.pd-img .swiper-container', {
  autoplay: 3000,
  slide: 1,
  pagination: '.pagination-pd',
  createPagination: false,// 杩欎釜璁剧疆鎴恌alse锛屽垯涓嶄細鑷姩鐢熸垚榛樿鐨勭偣
  paginationClickable: true, // 涓婇潰璁剧疆鎴恌alse鏃讹紝褰撳墠杩欎釜灞炴€у繀椤昏缃垚true,鐐瑰嚮鍒嗛〉鍣ㄧ殑鎸囩ず鐐规椂浼氬彂鐢熸粦鍔ㄥ埌瀵瑰簲鐨勫唴瀹逛笂銆?
  paginationBulletRender: function (swiper, index, className) {
    return '<span class="' + className + '">' + '<img src="' + $(".pd-img .swiper-slide").eq(index).find("img").attr("src") + '" alt="">' + '</span>';

  },
  autoplayDisableOnInteraction: false,
  // loop: true,
});

var mySwiper5 = new Swiper('.caseDet-center .swiper-container', {
  autoplay: 3000,
  pagination: '.pagination',
  createPagination: false,// 杩欎釜璁剧疆鎴恌alse锛屽垯涓嶄細鑷姩鐢熸垚榛樿鐨勭偣
  paginationClickable: true, // 涓婇潰璁剧疆鎴恌alse鏃讹紝褰撳墠杩欎釜灞炴€у繀椤昏缃垚true,鐐瑰嚮鍒嗛〉鍣ㄧ殑鎸囩ず鐐规椂浼氬彂鐢熸粦鍔ㄥ埌瀵瑰簲鐨勫唴瀹逛笂銆?  prevButton: '.swiper-button-prev',
  nextButton: '.swiper-button-next',
  loop: true,//鍙€夐€夐」锛屽紑鍚惊鐜?  autoplayDisableOnInteraction: false  // 濡傛灉璁剧疆涓篺alse锛岀敤鎴锋搷浣渟wiper涔嬪悗鑷姩鍒囨崲涓嶄細鍋滄锛屾瘡娆￠兘浼氶噸鏂板惎鍔╝utoplay銆?});
if ($(".caseDet-center .swiper-slide").length) {
  if ($(".caseDet-center .swiper-slide").length <= 3) {
    mySwiper5.stopAutoplay();
  }
}
if ($(".pd-img .swiper-slide").length) {
  if ($(".pd-img .swiper-slide").length <= 3) {
    mySwiper4.stopAutoplay();
  }
}


(function ($) {
  $.extend({
    Request: function (m) {
      var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
      return sValue ? sValue[1] : sValue;
    },
    UrlUpdateParams: function (url, name, value) {
      var r = url;
      if (r != null && r != 'undefined' && r != "") {
        value = encodeURIComponent(value);
        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
        var tmp = name + "=" + value;
        if (url.match(reg) != null) {
          r = url.replace(eval(reg), tmp);
        }
        else {
          if (url.match("[\?]")) {
            r = url + "&" + tmp;
          } else {
            r = url + "?" + tmp;
          }
        }
      }
      return r;
    }

  });
})(jQuery);

$(".selection .item-input input").blur(function () {
  var val1 = $(this).val();
  var suphref1 = $.UrlUpdateParams(window.location.href, "paifang", val1);

  $(".selection .item-input .sup-inp").attr("href", suphref1);
})

$(".procomsel-list1 li").click(function () {
  var pid1 = $(this).data("pid");
  var href1 = $.UrlUpdateParams(window.location.href, "pid1", pid1);
  window.location.href = href1;
})
$(".procomsel-list2 li").click(function () {
  var pid2 = $(this).data("pid");
  var href2 = $.UrlUpdateParams(window.location.href, "pid2", pid2);
  window.location.href = href2;
})




function accDiv(arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {
  }
  with (Math) {
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
};

function accMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
};

function getzf(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
}

if ($(".all-time").length) {
  for (var i = 0; i < $(".all-time").length; i++) {
    if (!$(".all-time").eq(i).text()) {
      $(".all-time").eq(i).text("");
    } else {
      var time = parseInt($(".all-time").eq(i).text());
      var m = Math.floor(accDiv(time, 60));
      var s = Math.floor(time - accMul(m, 60));
      $(".all-time").eq(i).text(getzf(m) + " : " + getzf(s));
    }
  }

}


if ($('.pd-main').length) {
  $('.pd-main').posfixed({
    top: '0',
    left: '',
    right: '0',
    zIndex: '',
    scrollLI: '.pd-edit', // 濮ｅ繋閲滈柅澶愩€?    rightName: '.pd-bar', //閸欏疇绔熺捄鐔兼閻ㄥ嫮娲呯€涳拷
    pdBoxInclusion: '.pd-box', // 閸栧懓锛欐径鎾劥閸滃苯鍞寸€瑰湱娈戦悥鍓侀獓
    padtabBox: '.pdTab-box', // 婢舵挳鍎撮悥鍓侀獓
    fixedTop: $(".wsc-TopCon").outerHeight()  // 1.fixedTop: $(".pdTab-box").outerHeight()  //闁板秶鐤嗛崣瀹犵珶閻╂帒鐡欓惃鍕躬鐠虹喖娈㈠姘З閺冩儼绐涚粋濠氥€婇柈銊ф畱鐠烘繄顬囬敍灞肩瑝闁板秶鐤嗛崚娆愭Ц0閵嗭拷
  })
}







$(function () {
  $(document).on('click', '.safety-icons img', function () {
    var src = $(this).attr('src');

    $.dialog({
      type: 'html',
      html: '<div class="dialog dialog-img">\n' +
        '    <div class="dia-content">\n' +
        '        <div class="dia-inner">\n' +
        '            <div class="dia-close"></div>\n' +
        '            <div class="dia-msg">' +
        '<img src="' + src + '">' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>',
    })
    touch.on(".dialog-img img", "touchstart", function (e) {
      var event1 = event || e;
      //鍏抽棴绯荤粺鐨勯粯璁よЕ鎽告晥鏋?      event1.preventDefault();
    });
    var initialScale = 1;//瀛樺偍鍘熷姣斾緥
    var currentScale;//瀛樺偍褰撳墠缂╂斁姣斾緥
    var dx, dy;
    touch.on(".dialog-img img", "pinchend", function (e) {
      var ev = event || e;
      currentScale = ev.scale - 1;
      currentScale = initialScale + currentScale;
      //璁剧疆鏈€澶ф斁澶ф瘮渚?2鍊?鍜屾渶灏忕缉灏忔瘮渚嬶紙0.5鍊嶏級
      // currentScale = currentScale > 2 ? 2 : currentScale;
      // currentScale = currentScale < 1 ? 0.5 : currentScale;
      //		currentScale 褰撳墠缂╂斁姣斾緥
      this.style.webkitTransform = "scale(" + currentScale + ")";
      this.style.left = 0

    });
    // touch.on(".dialog-img img","pinchend",function (){
    //     initialScale = currentScale;//姣忔閲嶇疆姝ゆ鍥剧墖鐨勫ぇ灏忓氨鏄師濮嬫瘮渚?    // });
    touch.on(".dialog-img img", 'drag', function (ev) {
      dx = dx || 0;
      dy = dy || 0;
      // log("褰撳墠x鍊间负:" + dx + ", 褰撳墠y鍊间负:" + dy + ".");
      var offx = dx + ev.x + "px";
      var offy = dy + ev.y + "px";
      this.style.webkitTransform = "scale(" + currentScale + ")" + "translate3d(" + offx + "," + offy + ",0)"
    });
    touch.on(".dialog-img img", 'dragend', function (ev) {
      dx += ev.x;
      dy += ev.y;
    });


  });
})



window.onload = function () {
  var flag = 0; //鏍囪鏄嫋鏇宠繕鏄偣鍑?  var oDiv = document.querySelector(".wsc-fixBar");
  var disX, moveX, L, T, starX, starY, starXEnd, starYEnd;
  oDiv.addEventListener('touchstart', function (e) {
    this.bodyScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    $('body').addClass('no-scroll').css({ top: -this.bodyScroll });


    flag = 0;

    disX = e.touches[0].clientX - this.offsetLeft;
    disY = e.touches[0].clientY - this.offsetTop;

    starX = e.touches[0].clientX;
    starY = e.touches[0].clientY;

  });
  oDiv.addEventListener('touchmove', function (e) {


    e.preventDefault();
    oDiv.style.right = "unset";
    flag = 1;
    L = e.touches[0].clientX - disX;
    T = e.touches[0].clientY - disY;

    starXEnd = e.touches[0].clientX - starX;
    starYEnd = e.touches[0].clientY - starY;

    if (L < $(window).width() * 0.1) {
      L = $(window).width() * 0.1;
    } else if (L > document.documentElement.clientWidth - this.offsetWidth) {
      L = document.documentElement.clientWidth - this.offsetWidth;
    }
    if (T < 0) {
      T = 0;
    } else if (T > document.documentElement.clientHeight - this.offsetHeight) {
      T = document.documentElement.clientHeight - this.offsetHeight;
    }
    moveX = L + 'px';
    moveY = T + 'px';

    this.style.left = moveX;
    this.style.top = moveY;
  });


  oDiv.addEventListener('touchend', function (e) {
    $('body').css("top", "").removeClass('no-scroll');
    $(window).scrollTop(this.bodyScroll);

  });



}