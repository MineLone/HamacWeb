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
          obj.bodyfixed();

        });
        $(" .top-search").on("click",function(e) {
                            $('.searCont').show();
                        });
                        $(".top-close").on("click",function(e) {
                            // $(".wsc-Nav").animate({right:"-7.5rem"},300);
                            $(this).parent().hide();
                        });
                        
                        $(" .top-lan").on("click",function(e) {
                            $('.lanCont').show();
                        });
                        $(".top-close").on("click",function(e) {
                            // $(".wsc-Nav").animate({right:"-7.5rem"},300);
                            $(this).parent().hide();
                        });
        $(".wsc-Nav .top-close").on("click", function (e) {
          $(".wsc-Nav").animate({ right: "-7.5rem" }, 300);
          obj.bodyfree();
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
        if ($(document).scrollTop() > 10) {
          $(".wsc-TopCon").addClass('wsc-TopConfix');
        } else {
          $(".wsc-TopCon").removeClass('wsc-TopConfix');
        }
        $(window).scroll(function () {
          if ($(document).scrollTop() > 10) {
            $(".wsc-TopCon").addClass('wsc-TopConfix');
          } else {
            $(".wsc-TopCon").removeClass('wsc-TopConfix');
          }
        })


        $doc.on("click", ".wsc-botfix .item3", function () {
          $(".dialog").fadeToggle(0);
          $(".botfix-lxway").fadeToggle(0);
          $(this).toggleClass("clicking");
          if ($(this).hasClass("clicking")) {
            obj.bodyfixed();
          } else {
            obj.bodyfree();
          }

        })
        $(".dialog").click(function () {

          $(".botfix-lxway").fadeOut(0);
          $(".dialog").fadeOut(0);
          $(".wsc-botfix .item3").removeClass("clicking");
          obj.bodyfree();
        })

        $doc.on("click", ".fm-check ", function () {
          $(this).find('.check-icon').toggleClass("checked");
          if ($(this).find('.check-icon').hasClass("checked")) {
            $(this).find("input[name=isRecive]").val("true")
          } else {
            $(this).find("input[name=isRecive]").val("false")
          }

        })

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
        $(".prol-banText").click(function () {
          $(this).toggleClass("clicking");
        })

        $(".yy-block2 .tab-list li").click(function () {
          var ind = $(this).index();
          $(this).addClass("active").siblings().removeClass("active");
          $(".yy-block2 .tab-item").eq(ind).addClass("active").siblings().removeClass("active");
        })

      },
      owlEvent: function () {


      },
      bodyfixed: function () {
        toph = $(document).scrollTop();
        setTimeout(function () {
          $("body").css({
            "position": "fixed",
            "top": "-" + toph + "px",
            "width": "7.5rem"
          })
        }, 400)
      },
      bodyfree: function () {
        $("body").css({
          "position": "unset",
          "top": "unset",
          "width": "unset"
        })
        setTimeout(function () {
          $('html,body').animate({ scrollTop: toph }, 0)
        }, 200)
      },
      form: function () {

        $('button[type="submit"]').on('click', function () {
          var nVal = $('input[name="name"]').val()
          var pVal = $('input[name="tel"]').val()
          var iVal = $('textarea[name="content"]').val()
          var re = /^1[3456789]\d{9}$/;
          if (!nVal) {
            alert("请填写您的称呼！");
            return false;
          }
          if (!pVal || !re.test(pVal)) {
            alert("请填写正确的手机号！");
            return false;
          }
          if (!iVal) {
            alert("请填写您的需求！");
            return false;
          }
        })
        // $('.comment-form').validator({
        //   fields: {
        //     email: {
        //       rule: 'required,email',
        //       msg: {
        //         required: '请输入您的邮箱',
        //         email: '请输入正确格式的邮箱'
        //       }
        //     },
        //     tel: {
        //       rule: 'required,tel',
        //       msg: {
        //         required: '请输入您的联系方式',
        //       }
        //     },
        //   },
        //   rules: {
        //     tel: [/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, '请输入正确格式的手机号码']
        //   }
        // });

        // $('.comment-form').on('valid.form', function (e) {
        //   e.preventDefault();
        //   var $form = $(this);
        //   var url = $form.attr('action');
        //   var data = $form.serialize();
        //   $.ajax({
        //     //防止服务器拿不到数据
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     url: url,
        //     data: data,
        //     type: 'POST',
        //     success: function (res) {

        //       if (res.status) {
        //         $('.comment-form input[type="text"]').val('');
        //         $('.comment-form textarea').val('');
        //         window.location.href = "/addes/"
        //       } else {
        //         //提交失败处理
        //         alert('FAIL!');
        //       }
        //       //更新表单token
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


if( $('div').is('.index-banner .swiper-container')){
  //是否执行

  var mySwiper1 = new Swiper('.index-banner .swiper-container', {
    autoplay: 5000,
    slide: 1,
    pagination: '.pagination-inban',
    createPagination: false,// 这个设置成false，则不会自动生成默认的点
    paginationClickable: true, // 上面设置成false时，当前这个属性必须设置成true,点击分页器的指示点时会发生滑动到对应的内容上。
    paginationBulletRender: function (swiper, index, className) {
      return '<span class="' + className + '">' + '<i class="dot"></i>' + '</span>';
    },
    loop: true,
  });

}


if( $('div').is('.inb1-main .swiper-container')){
  //是否执行
  var mySwiper2 = new Swiper('.inb1-main .swiper-container', {
    autoplay: 5000,
    pagination: '.swiper-pagination',
    createPagination: false,// 这个设置成false，则不会自动生成默认的点
    paginationClickable: true, // 上面设置成false时，当前这个属性必须设置成true,点击分页器的指示点时会发生滑动到对应的内容上。
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
  });

}
if( $('div').is('.inb1-main .swiper-container')){
  //是否执行
  var mySwiper3 = new Swiper('.picd-imglist .swiper-container', {
    slidesPerView: 3,
  });
  
}



if ($('.picd-imglist .swiper-container').length) {
  var act = $('.picd-imglist .swiper-container').find(".active").parent();
  mySwiper3.slideTo(act.index(), 1000, false);
}

if( $('div').is('.inb1-main .swiper-container')){
  //是否执行
  var mySwiper4 = new Swiper('.pd-img .swiper-container', {
    autoplay: 5000,
    slide: 1,
    pagination: '.pagination-pd',
    createPagination: false,// 这个设置成false，则不会自动生成默认的点
    paginationClickable: true, // 上面设置成false时，当前这个属性必须设置成true,点击分页器的指示点时会发生滑动到对应的内容上。
    autoplayDisableOnInteraction: false,
    // loop: true,
  });


}


if( $('div').is('.inb1-main .swiper-container')){
  //是否执行
  var mySwiper5 = new Swiper('.his-block2 .swiper-container', {
    autoplay: 5000,
    slide: 1,
    pagination: '.pagination-his',
    createPagination: false,// 这个设置成false，则不会自动生成默认的点
    paginationClickable: true, // 上面设置成false时，当前这个属性必须设置成true,点击分页器的指示点时会发生滑动到对应的内容上。
    paginationBulletRender: function (swiper, index, className) {
      var tit = '';
      if (index == 0) {
        tit = '<div class="tit">1965 <span>年</span></div>'
      } else if (index == 1) {
        tit = '<div class="tit">1998 <span>年</span></div>'
      } else if (index == 2) {
        tit = '<div class="tit">2013 <span>年</span></div>'
      } else if (index == 3) {
        tit = '<div class="tit">2019 <span>年</span></div>'
      } else if (index == 4) {
        tit = '<div class="tit">2020 <span>年</span></div>'
      }
      return '<div class="' + className + '">' + '<i class="dot"></i>' + tit + '</div>';
    },
    loop: true,
  });

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
function getzf(num){
	if(parseInt(num) < 10){
		num = '0'+num;
	}
	return num;
}
if($(".all-time").length){
	for(var i= 0;i<$(".all-time").length;i++){
		if(!$(".all-time").eq(i).text()){
			$(".all-time").eq(i).text("");
		}else{
			var time = parseInt($(".all-time").eq(i).text());
			var m =Math.floor(accDiv(time,60));
			var s = Math.floor(time - accMul(m,60));
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
    scrollLI: '.pd-edit', // 每个选项
    rightName: '.pd-bar', //右边跟随的盒子
    pdBoxInclusion: '.pd-box', // 包裹头部和内容的父级
    padtabBox: '.pdTab-box', // 头部父级
    fixedTop: $(".wsc-TopCon").outerHeight()  // 1.fixedTop: $(".pdTab-box").outerHeight()  //配置右边盒子的在跟随滚动时距离顶部的距离，不配置则是0。
  })
}

function checkOrient() {

  if (window.orientation == 0 || window.orientation == 180) {
    window.location.reload();
  }
  else if (window.orientation == 90 || window.orientation == -90) {
    window.location.reload();
  }
  return screenOrientation;
}
// 添加事件监听
// $(window).resize(function(){
// 	if (window.orientation===90 ||window.orientation===-90){
//         window.location.reload();
//     }
// })
window.addEventListener('orientationchange', checkOrient, false);