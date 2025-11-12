$(document).ready(function () {
    const video = $('.preview__video')[0]
    const windowWidth = $(window).width()
    const slides = $('.about__flex-slider')
    const dots = $('.about__flex-items > li > div')

    let totalSlides = 4
    let currentSlide = 0
    let halfReached = false
    let autoSlide = setInterval(function () {
        goToSlide(currentSlide + 1)
    }, 4000);

    function showModalWindow() {
        if ($('.dialog-window-bkgr').css('display') === 'none') {
            $('.dialog-window-bkgr').css('display', 'flex')
            $('body').css({
                'overflow': 'hidden',
                'height': '100vh',
                'position': 'fixed'
            });
            video.pause()
        }
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex
        let translateX = -currentSlide * 25.532

        function updateCssStyleSlider(percent) {
            slides.css({
                'transition': `transform 0.4s`,
                'transform': `translateX(${percent}%)`
            })
        }

        if (windowWidth < 1200 && windowWidth > 1024) {
            totalSlides = 3
        }

        if (currentSlide < 0) {
            currentSlide = totalSlides - 1
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0
        }

        if (windowWidth <= 1200 && windowWidth > 1024) {
            translateX = -currentSlide * 34.032
            updateCssStyleSlider(translateX)
        } else if (windowWidth <= 1024 && windowWidth > 767) {
            translateX = -currentSlide * 51.064
            updateCssStyleSlider(translateX)
        } else if (windowWidth <= 767) {
            translateX = -currentSlide * 102.128
            updateCssStyleSlider(translateX)
        } else {
            updateCssStyleSlider(translateX)
        }

        
        dots.removeClass('about__flex-item_active');
        dots.eq(currentSlide).addClass('about__flex-item_active')
    }
    dots.click(function () {
        const slideIndex = $(this).data('slide')
        goToSlide(slideIndex)
    })
    $('#next').click(function () {
        goToSlide(currentSlide + 1)
    })
    $('#prev').click(function () {
        goToSlide(currentSlide - 1)
    })
    $('.about__flex').hover(
        function () {
            clearInterval(autoSlide)
        },
        function () {
            autoSlide = setInterval(function () {
                goToSlide(currentSlide + 1)
            }, 4000)
        }
    );


    $('.account__sin, .account__sup, .subscription__btn, .suggestion__btn').click(function () {
        if ($('.dialog-window-bkgr').css('display') === 'none') {
            $('.dialog-window-bkgr').css('display', 'flex')
            $('body').css({
                'overflow': 'hidden',
                'height': '100vh',
                'position': 'fixed'
            });
            video.pause()
        }
    })
    $('.dialog-window__close').click(function () {
        if ($('.dialog-window-bkgr').css('display') === 'flex') {
            $('.dialog-window-bkgr').css('display', 'none')
            $('body').css({
                'overflow': 'auto',
                'height': 'auto',
                'position': 'static'
            })
        }
        if (halfReached == true) {
            video.play()
        }
    })

    $(video).on('timeupdate', function () {
        const currentTime = this.currentTime
        const duration = this.duration

        if (duration > 0 && currentTime >= duration / 2 && !halfReached) {
            halfReached = true
            this.pause()
            showModalWindow()
        }
    })


})
