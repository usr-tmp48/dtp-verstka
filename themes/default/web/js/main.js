$(document).ready(function () {
    var windowW;
    $(window).resize(function () {
        windowW = $(window).width();
        if (windowW >= 992) {
            $('#js-menu-btn').removeClass('open');
            $('#js-overlay').removeClass('open');
            $('.js-page-wrapper').removeClass('open');
            $('.js-page').removeClass('open');
            $('.js-submenu').removeClass('open');
        }
    });
    $(window).trigger('resize');
    
    //scroll menu
    var menu = $('.menu-wrapper');
    var menuTop = menu.offset().top;
    $(window).scroll(function () {
        fixMenu();
    });
    fixMenu();
    function fixMenu() {
        if ($(window).scrollTop() >= menuTop) {
            menu.addClass('fixed');
        } else {
            menu.removeClass('fixed');
        }
    }
    
    //mobile menu
    $('#js-menu-btn').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('.js-page-wrapper').toggleClass('open');
        $('.js-page').toggleClass('open');
        $('#js-overlay').toggleClass('open');
    });
    $('.js-submenu-btn').click(function (e) {
        e.preventDefault();
        $(this).closest('.js-submenu').addClass('open');
        $('#js-menu').scrollTop(0);
    });
    $('.js-menu-back').click(function (e) {
        e.preventDefault();
        $(this).closest('.js-submenu').parent().closest('.js-submenu').removeClass('open');
    });
    $(document).mouseup(function (e) {
        if ($('#js-overlay').is(e.target)) {
            $('#js-menu-btn').removeClass('open');
            $('js-page-wrapper').removeClass('open');
            $('.js-page').removeClass('open');
            $('#js-overlay').removeClass('open');
        }
    });
    
    //welcome-slider
    if ($('*').is('.js-welcome-slider')) {
        $('.js-welcome-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            fade: true,
            dots: true
        });
    }
    
    //articles-slider
    if ($('*').is('.js-articles-slider')) {
        $('.js-articles-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }
    
    //products-slider
    if ($('*').is('.js-products-slider')) {
        $('.js-products-slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }
    
    //product-page-slider
    if ($('*').is('#js-product-page-slider-big') && $('*').is('#js-product-page-slider-small')) {
        $('#js-product-page-slider-big').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '#js-product-page-slider-small'
        });
        $('#js-product-page-slider-small').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '#js-product-page-slider-big',
            focusOnSelect: true,
            vertical: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        vertical: false,
                    }
                },
                {
                    breakpoint: 361,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
        $( '.swipebox' ).swipebox( {
            useCSS : true,
            useSVG : false,
            removeBarsOnMobile: false
        } );
    }
});
function authSendForm(form, data, hasError) {
	$('#notifications').html("");
    $.ajax({
        url: form[0].action,
        type: 'POST',
		dataType: 'json',
        data: form.serialize(),
        success: function (response) {
            if (response.result) {
                document.getElementById($(form[0]).attr('id')).reset();
				$('#notifications').html(response.message);
				setTimeout(function(){$('.modal').modal('hide');if(response.url){document.location.href=response.url}},5000);
            }else{
				$('#notifications').html(response.message);
			}
			$('#notifications').addClass('active');
			setTimeout(function(){$('#notifications').removeClass('active');},3000);
        },
        error: function () {
        }
    });
    return false;
}
function init(map) {
	if(document.getElementById(map)==null){
		return false;
	}
	myMap = new ymaps.Map(map, {
		center: [55.753994, 37.622093],
		zoom: 9
	});
	ymaps.geocode(scheme_address, {
		results: 1
	}).then(function (res) {
			var firstGeoObject = res.geoObjects.get(0),
				coords = firstGeoObject.geometry.getCoordinates(),
				bounds = firstGeoObject.properties.get('boundedBy');
			firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
			firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
			myMap.geoObjects.add(firstGeoObject);
			myMap.setBounds(bounds, {
				checkZoomRange: true
			});
			$('#'+map).addClass('active');
		});
}