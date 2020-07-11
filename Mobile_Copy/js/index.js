
$(function() {
    var $doc = $(document),

        obj = {
            init: function() {
                this.event();
                this.form();
                this.owlEvent();
            },
            event: function() {
                var toph = 0;
                $(" .top-menu").on("click", function(e) {
                    $(".wsc-Nav").animate({
                        right: 0
                    }, 300);
                    toph = $(document).scrollTop();
                    setTimeout(function() {
                        $("body").css({
                            "position": "fixed",
                            "top": "-" + toph + "px"
                        })
                    }, 400)

                    console.log(toph)
                });
                $(" .top-search").on("click", function(e) {
                    $('.searCont').show();
                });
                $(".top-close").on("click", function(e) {
                    // $(".wsc-Nav").animate({right:"-7.5rem"},300);
                    $(this).parent().hide();
                });

                $(" .top-lan").on("click", function(e) {
                    $('.lanCont').show();
                });
                $(".top-close").on("click", function(e) {
                    // $(".wsc-Nav").animate({right:"-7.5rem"},300);
                    $(this).parent().hide();
                });
                $(".wsc-Nav .top-close").on("click", function(e) {
                    $(".wsc-Nav").animate({
                        right: "-7.5rem"
                    }, 300);
                    console.log(toph)
                    $("body").css({
                        "position": "unset",
                        "top": "unset"
                    })
                    setTimeout(function() {
                        $('html,body').animate({
                            scrollTop: toph
                        }, 0)
                    }, 200)
                });
                $(".hn-text").on("click", function(e) {
                    $(this).parent('.hn-item').addClass('active').siblings().removeClass('active');
                    $(this).siblings('.hn-drop').slideToggle();
                    $(this).find('span').toggleClass('rotate180');
                    $(this).parent('.hn-item').siblings().find('span').removeClass('rotate180');
                    $(this).parent('.hn-item').siblings().find('.hn-drop').slideUp();
                });

                $(".fn-text").on("click", function(e) {
                    $(this).siblings('ul').slideToggle();
                    $(this).find('span').toggleClass('rotate180');
                    $(this).parent('.fn-item').siblings().find('span').removeClass('rotate180');
                    $(this).parent('.fn-item').siblings().find('ul').slideUp();
                });

                $(window).scroll(function() {

                    if (!$("body").hasClass("no-scroll")) {
                        if ($(document).scrollTop() > 10) {
                            $(".wsc-TopCon").addClass('wsc-TopConfix');
                        } else {
                            $(".wsc-TopCon").removeClass('wsc-TopConfix');
                        }
                    }

                })


                $(".fb-top").click(function() {
                    $('html,body').animate({
                        'scrollTop': 0
                    })
                });

            },
            owlEvent: function() {


            },
            form: function() {


            },
        };
    obj.init();
})


var mySwiper1 = new Swiper('.index-banner .swiper-container', {
    autoplay: 5000,
    slide: 1,
    pagination: '.pagination-inban',
    createPagination: false, // 这个设置成false，则不会自动生成默认的点
    paginationClickable: true, // 上面设置成false时，当前这个属性必须设置成true,点击分页器的指示点时会发生滑动到对应的内容上。

    paginationBulletRender: function(swiper, index, className) {
        return '<span class="' + className + '">' + '<i class="dot">' + '';
    },
    loop: true,
});
var mySwiper2 = new Swiper('.inb1-main .swiper-container', {
    autoplay: 5000,
    pagination: '.swiper-pagination',
    createPagination: false, // 这个设置成false，则不会自动生成默认的点
    paginationClickable: true, // 上面设置成false时，当前这个属性必须设置成true,点击分页器的指示点时会发生滑动到对应的内容上。
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
});

function checkOrient() {

    if (window.orientation == 0 || window.orientation == 180) {
        window.location.reload();
    } else if (window.orientation == 90 || window.orientation == -90) {
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


window.onload = function() {
    var flag = 0; //标记是拖曳还是点击
    var oDiv = document.querySelector(".wsc-fixBar");
    var disX, moveX, L, T, starX, starY, starXEnd, starYEnd;
    oDiv.addEventListener('touchstart', function(e) {
        this.bodyScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        $('body').addClass('no-scroll').css({
            top: -this.bodyScroll
        });


        flag = 0;

        disX = e.touches[0].clientX - this.offsetLeft;
        disY = e.touches[0].clientY - this.offsetTop;

        starX = e.touches[0].clientX;
        starY = e.touches[0].clientY;

    });
    oDiv.addEventListener('touchmove', function(e) {


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


    oDiv.addEventListener('touchend', function(e) {
        $('body').css("top", "").removeClass('no-scroll');
        $(window).scrollTop(this.bodyScroll);

    });


}
