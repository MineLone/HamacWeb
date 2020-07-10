$(function () {
    if($(".tabs-nav").length){
        var mySwiper = new Swiper('.tabs-nav', {
            freeMode: true,
            freeModeMomentumRatio: 0.5,
            slidesPerView: 'auto',
        });
    
        var swiperWidth = mySwiper.container[0].clientWidth;
        var maxTranslate = mySwiper.maxTranslate();
        var maxWidth = -maxTranslate + swiperWidth / 2;
    
        // $(".wrapper02").on('touchstart', function(e) {
        //     e.preventDefault()
        // })
    
        mySwiper.on('tap', function(swiper, e) {
            e.stopPropagation();
    //	e.preventDefault()
    
            var slide = swiper.slides[swiper.clickedIndex];
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
    
            $(".tabs-nav  .active").removeClass('active');
    
            $(".tabs-nav .swiper-slide").eq(swiper.clickedIndex).addClass('active');
            $(".tabs-main").find(".tabs-item").eq(swiper.clickedIndex).show().siblings().hide()
    
        });
    }
    






});