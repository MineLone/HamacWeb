$(function () {
  var $doc = $(document),

    obj = {
      init: function () {
        this.event();
        this.form();
        this.owlEvent();
      },
      event: function () {

        var stop = null, stop1 = null;
        //导航动画
        $('.wsc-topnav .hn-text').mouseenter(function () {
          var $this = $(this);
          clearTimeout(stop);
          stop = null;
          $this.parent().siblings().find('.hn-drop').hide();
          $this.parent().find('.hn-drop').show().siblings();
        });
        $('.wsc-topnav .hn-item').mouseleave(function () {
          var $this = $(this);
          if (!stop) {
            stop = setTimeout(function () {
              $this.find('.hn-drop').hide();

            });
          }

        });
        $('.wsc-topnav .hn-drop').mouseenter(function () {
          clearTimeout(stop);
        });
        $('.wsc-topnav .hn-drop').mouseleave(function () {
          $(this).hide();
        });



        $(".wsc-nav .hn-item").hover(function () {
          $(this).addClass("active");
          $(this).find(".hn-drop").stop().fadeIn(300);
          $(".hn-search").find(".hn-drop").stop().hide();

        }, function () {
          $(this).removeClass("active");
          $(this).find(".hn-drop").stop().hide();
        });
        $(".wsc-nav .wsc-NavCon").hover(function () {
          $(".hn-dropbg").stop().fadeIn(250)
        }, function () {
          $(".hn-dropbg").stop().fadeOut(250);
        })

        $(".search-icon").click(function () {
          $(".hn-dropbg").slideDown(250);
          $(this).siblings(".hn-drop").slideDown(250);
          $(this).addClass("active");
        })
        $(".top-close").click(function () {
          $(this).parents(".hn-drop").slideUp(250);
          $(".hn-dropbg").slideUp(250);
          $(".search-icon").removeClass("active");

        })

        $(".hn-lan").hover(function () {
          $(this).find(".lan-list").stop().fadeIn();
        }, function () {
          $(this).find(".lan-list").stop().fadeOut();
        });

        $(".selecte-head .item-other .tit").click(function () {
          $(".selecte-head .item-more .list").fadeToggle(250);
          $(this).find("span").toggleClass("rotate180");
        })




        $(".inb5-tablist li").mouseenter(function () {
          var ind = $(this).index();
          $(this).addClass("active").siblings().removeClass("active");
          $(".inb5-tabitem").eq(ind).addClass("active").siblings().removeClass("active");
        })


        $(".procomsel-head").click(function () {
          $(this).siblings(".procomsel-list").slideToggle();
        })
        $(".procomsel-list li").click(function () {
          $(this).parent().slideToggle();
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

        $(".fb-top").click(function () { $('html,body').animate({ 'scrollTop': 0 }) });

        if ($(".sellist-total").length) {
          var listnum1 = 0
          if ($(".resel-list .list-noresult").length) {
            listnum1 = $(".resel-list .list-noresult").length;
            console.log(listnum1);
          }
          $(".sellist-total").text($(".resel-list .list-item").length - listnum1);
          console.log($(".resel-list .list-item").length);
        }
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

      }, 
    };
  obj.init();
})


if( $('div').is('.index-banner')){

  //是否执行

  var inSwiper = new Swiper('.index-banner .swiper-container', {
    autoplay: 3000,
    slide: 1,
    pagination: '.pagination',
    createPagination: false,
    paginationClickable: true,
    loop: true,
  });

}

if( $('div').is('.pd-img')){

  //是否执行

  var mySwiper2 = new Swiper('.pd-img .swiper-container', {
    autoplay: 3000,
    slide: 1,
    pagination: '.pagination-pd',
    createPagination: false,
    paginationClickable: true,
    autoplayDisableOnInteraction: false,
    loop: true,
  });

}

if( $('div').is('.pd-img2')){

    //是否执行
  var mySwiper3 = new Swiper('.pd-img2 .swiper-container', {
    autoplay: 3000,
    slide: 1,
    pagination: '.pagination-pd',
    createPagination: false,
    paginationClickable: true,
    autoplayDisableOnInteraction: false,
    loop: true,
    
  });


}






$('.index-banner .swiper-container').mouseenter(function () {
  inSwiper.stopAutoplay();
})
$('.index-banner .swiper-container').mouseleave(function () {
  inSwiper.startAutoplay();
})
$('.index-banner .swiper-prev').on("click", function (e) {
  inSwiper.swipePrev() // 上一张
});

$('.index-banner .swiper-next').on("click", function (e) {
  inSwiper.swipeNext() // 下一张
});


if ($(".pd-img .swiper-slide").length) {
  if ($(".pd-img .swiper-slide").length <= 3) {
    mySwiper2.stopAutoplay();
  }
}

$('.pd-img .swiper-prev').on("click", function (e) {
  mySwiper2.swipePrev() // 上一张
});

$('.pd-img .swiper-next').on("click", function (e) {
  mySwiper2.swipeNext() // 下一张
});


$('.pd-img2 .swiper-prev').on("click", function (e) {
  mySwiper3.swipePrev() // 上一张
});

$('.pd-img2 .swiper-next').on("click", function (e) {
  mySwiper3.swipeNext() // 下一张
});
if ($(".pd-img2 .swiper-slide").length) {
  if ($(".pd-img2 .swiper-slide").length <= 3) {
    mySwiper3.stopAutoplay();
  }
}


if ($(".pd-main").length) {
  $('.pd-main').posfixed({
    top: "0",
    left: "",
    right: "0",
    zIndex: ""
  })
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
  console.log(val1);
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

$(function () {
  $(document).on('click', '.safety-icons img', function () {
    var src = $(this).attr('src');
    console.log(src);
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
  });
})