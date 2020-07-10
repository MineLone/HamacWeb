$(function () {
    if( $(".wsc-secNav").length){
        var innterWidth = "";
        for(var i = 0 ;i < $(".swiper-wrapper li").length;i++){
            var liWidth = $(".swiper-wrapper li")[i];
            innterWidth+= $(liWidth).innerWidth()
        }
        if(innterWidth> $(window).width()){
            $(".sn-more").show();
            $(".sn-jsbox").css("padding-right",$(".sn-more").width()*1.5);

        }
        var mySwiper = new Swiper('.sn-jsbox', {
            freeMode: true,
            freeModeMomentumRatio: 0.5,
            slidesPerView: 'auto',
        });

        var swiperWidth = mySwiper.container[0].clientWidth;
        var maxTranslate = mySwiper.maxTranslate();
        var maxWidth = -maxTranslate + swiperWidth / 2;



        mySwiper.on('tap', function(swiper, e) {
            e.stopPropagation();
//	e.preventDefault()
            var slide = swiper.slides[swiper.clickedIndex];
            swiperCommonContent(slide);
            $(".sn-jsbox .swiper-slide").eq(swiper.clickedIndex).addClass('active')

        });

        // 遍历获取被选中的目标
        function eachTarget(){
            for(var i = 0 ;i < mySwiper.slides.length; i++){
                var swiper = $(mySwiper.slides)[i];
                if($(swiper).hasClass("active")){
                    return [i,swiper]
                }
            }
            return  false
        }

        // 处理公同代码
        function swiperCommonContent(slide){
            var slideLeft = slide.offsetLeft;
            var slideWidth = slide.clientWidth;
            var slideCenter = slideLeft + slideWidth / 2;
            // 被点击slide的中心点

            mySwiper.setWrapperTransition(300);

            if (slideCenter < swiperWidth / 2) {

                mySwiper.setWrapperTranslate(0)

            } else if (slideCenter > maxWidth) {

                mySwiper.setWrapperTranslate(maxTranslate)

            } else {

                var nowTlanslate = slideCenter - swiperWidth / 2;

                mySwiper.setWrapperTranslate(-nowTlanslate)

            }

            $(".sn-jsbox .active").removeClass('active');
        }
        init();
        function init(){
            var target = eachTarget();
            if( target){
                var slide = target[1];
                swiperCommonContent(slide);
                $(".sn-jsbox .swiper-slide").eq(target[0]).addClass('active')
            }

        }

        $(".sn-more").on("click",function (e) {   // 回调
            e.stopPropagation();
            scrollDialog()
        });
        $(document).on("click",".close-icon",function () {
            $(this).parents(".sn-drop").hide();
            $(".sn-more").show()
        });
        function scrollDialog() {
            var dialogInfo =$(".sn-jsbox").find(".swiper-wrapper li");
            var html = "";
            for(var i = 0; i < dialogInfo.length; i++){
                var lis = dialogInfo[i];
                var liChild = $(lis).find("a");
                var src = $(lis).find("a").attr("href");
                var lisText = $(liChild).clone();
                lisText.find(':nth-child(n)').remove();
                var text = $(lisText).html();
                if($(lis).hasClass("active")){
                    html+="<li class='active'><a href='"+src+"'>"+text+"</a></li>"
                }else {
                    html+="<li><a href='"+src+"'>"+text+"</a></li>"
                }

            }
            $(".sn-drop").show();
            $(".sn-drop  ul").html(html);
            $(".sn-more").hide()
        }
    }

});