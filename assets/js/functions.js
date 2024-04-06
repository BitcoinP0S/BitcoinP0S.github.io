/*global jQuery */
/* Contents
// ------------------------------------------------>
	1.  LOADING SCREEN
	2.  BACKGROUND INSERT
	3.	NAV MODULE
	4.  MOBILE MENU
	5.  HEADER AFFIX
	6.  COUNTER UP
	7.  COUNTDOWN DATE
	8.  AJAX MAILCHIMP
	9.  AJAX CAMPAIGN MONITOR 
	10. OWL CAROUSEL
	12. MAGNIFIC POPUP
	12. MAGNIFIC POPUP VIDEO
	13. BACK TO TOP
    14. GALLERY FLITER
    15. CASE Filter
	16. SCROLL TO
    17. PROGRESS BAR
    18. SLIDER RANGE
	19. FLIP COUNTER
	20. ANIMATION
*/
(function($) {
    "use strict";
    /* ------------------  LOADING SCREEN ------------------ */

    $(window).on("load", function() {
        $(".preloader").fadeOut(1000);
        $(".preloader").remove();
    });

    /* ------------------  Background INSERT ------------------ */

    var $bgSection = $(".bg-section");
    var $bgPattern = $(".bg-pattern");
    var $colBg = $(".col-bg");

    $bgSection.each(function() {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-section");
        $(this).remove();
    });

    $bgPattern.each(function() {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-pattern");
        $(this).remove();
    });

    $colBg.each(function() {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("col-bg");
        $(this).remove();
    });

    /* ------------------  NAV MODULE  ------------------ */

    var $moduleIcon = $(".module-icon"),
        $moduleCancel = $(".module-cancel");
    $moduleIcon.on("click", function(e) {
        $(this).parent().siblings().removeClass('module-active'); // Remove the class .active form any sibiling.
        $(this).parent(".module").toggleClass("module-active"); //Add the class .active to parent .module for this element.
        e.stopPropagation();
    });
    // If Click on [ Search-cancel ] Link
    $moduleCancel.on("click", function(e) {
        $(".module").removeClass("module-active");
        e.stopPropagation();
    });

    $(".side-nav-icon").on("click", function() {
        if ($(this).parent().hasClass('module-active')) {
            //$(".module-hamburger > .hamburger-panel").css;
            $(".wrapper").addClass("hamburger-active");
            $(this).addClass("module-hamburger-close");
        } else {
            //$(".module-hamburger").width(0);
            $(".wrapper").removeClass("hamburger-active");
            $(this).removeClass("module-hamburger-close");
        }

    });
    // If Click on [ Document ] and this click outside [ hamburger panel ]
    $(document).on("click", function(e) {
        if ($(e.target).is(".hamburger-panel,.hamburger-panel .list-links,.hamburger-panel .list-links a,.hamburger-panel .social-share,.hamburger-panel .social-share a i,.hamburger-panel .social-share a,.hamburger-panel .copywright") === false) {
            $(".wrapper").removeClass("page-transform"); // Remove the class .active form .module when click on outside the div.
            $(".module-side-nav").removeClass("module-active");
            e.stopPropagation();
        }
    });

    // If Click on [ Document ] and this click outside [ module ]
    $(document).on("click", function(e) {
        if ($(e.target).is(".module, .module-content, .search-form input,.cart-control .btn,.cart-overview a.cancel,.cart-box") === false) {
            $module.removeClass("module-active"); // Remove the class .active form .module when click on outside the div.
            e.stopPropagation();
        }
    });

    /* ------------------  MOBILE MENU ------------------ */

    var $dropToggle = $("ul.dropdown-menu [data-toggle=dropdown]"),
        $module = $(".module");
    $dropToggle.on("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().siblings().removeClass("open");
        $(this).parent().toggleClass("open");
    });

    $module.on("click", function() {
        $(this).toggleClass("toggle-module");
    });
    $module.find("input.form-control", ".btn", ".module-cancel").on("click",function(e) {
        e.stopPropagation();
    });
    
    $("nav").find("li").on("click", "a", function () {
        $('.navbar-collapse').collapse('hide');
    });
    /* ------------------ HEADER AFFIX ------------------ */

    var $navAffix = $(".header-fixed .navbar-fixed-top");
    $navAffix.affix({
        offset: {
            top: 50
        }
    });

    /* ------------------ MAGNIFIC POPUP ------------------ */

    var $imgPopup = $(".img-popup");
    $imgPopup.magnificPopup({
        type: "image"
    });
    $('.img-gallery-item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* ------------------  MAGNIFIC POPUP VIDEO ------------------ */

    $('.popup-video,.popup-gmaps').magnificPopup({
        disableOn: 700,
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });

    /* ------------------  BACK TO TOP ------------------ */

    var backTop = $('#back-to-top');

    if (backTop.length) {
        var scrollTrigger = 200, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    backTop.addClass('show');
                } else {
                    backTop.removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        backTop.on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    /* ------------------ GALLERY FLITER ------------------ */

    var $galleryFilter = $(".gallery-filter"),
        galleryLength = $galleryFilter.length,
        galleryFinder = $galleryFilter.find("a"),
        $galleryAll = $("#gallery-all");

    // init Isotope For gallery
    galleryFinder.on("click", function(e) {
        e.preventDefault();
        $galleryFilter.find("a.active-filter").removeClass("active-filter");
        $(this).addClass("active-filter");
    });
    if (galleryLength > 0) {
        $galleryAll.imagesLoaded().progress(function() {
            $galleryAll.isotope({
                filter: "*",
                animationOptions: {
                    duration: 750,
                    itemSelector: ".gallery-item",
                    easing: "linear",
                    queue: false,
                }
            });
        });
    }
    galleryFinder.on("click", function(e) {
        e.preventDefault();
        var $selector = $(this).attr("data-filter");
        $galleryAll.imagesLoaded().progress(function() {
            $galleryAll.isotope({
                filter: $selector,
                animationOptions: {
                    duration: 750,
                    itemSelector: ".gallery-item",
                    easing: "linear",
                    queue: false,
                }
            });
            return false;
        });
    });

    /* ------------------ CASE FLITER ------------------ */

    var $caseFilter = $(".case-filter"),
        caseLength = $caseFilter.length,
        caseFinder = $caseFilter.find("a"),
        $caseAll = $("#case-all");

    // init Isotope For gallery
    caseFinder.on("click", function(e) {
        e.preventDefault();
        $caseFilter.find("a.active-filter").removeClass("active-filter");
        $(this).addClass("active-filter");
    });
    if (caseLength > 0) {
        $caseAll.imagesLoaded().progress(function() {
            $caseAll.isotope({
                filter: "*",
                animationOptions: {
                    duration: 750,
                    itemSelector: ".case-item",
                    easing: "linear",
                    queue: false,
                }
            });
        });
    }
    caseFinder.on("click", function(e) {
        e.preventDefault();
        var $selector = $(this).attr("data-filter");
        $caseAll.imagesLoaded().progress(function() {
            $caseAll.isotope({
                filter: $selector,
                animationOptions: {
                    duration: 750,
                    itemSelector: ".case-item",
                    easing: "linear",
                    queue: false,
                }
            });
            return false;
        });
    });

    /* ------------------  SCROLL TO ------------------ */

    var aScroll = $('a[data-scroll="scrollTo"]');
    aScroll.on('click', function(event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
            if ($(this).hasClass("menu-item")) {
                $(this).parent().addClass("active");
                $(this).parent().siblings().removeClass("active");
            }
        }
    });

    /* ------------------ PROGRESS BAR ------------------ */
    if ($(".skills").length > 0) {
        $(window).scroll(function() {
            var skillsTop = $(".skills").offset().top - 50,
                skillsHight = $(this).outerHeight(),
                wScroll = $(window).scrollTop();
            if (wScroll > skillsTop - 1 && wScroll < skillsTop + skillsHight - 1) {
                $(".progress-bar").each(function() {
                    $(this).width($(this).attr('aria-valuenow') + '%');
                });
            }
        });
    }

    if ($(".skills-scroll").length > 0) {
        $(".progress-bar").each(function() {
            $(this).width($(this).attr('aria-valuenow') + '%');
        });
    }


    /* ------------------ SLIDER RANGE ------------------ */

    var $sliderRange = $("#slider-range"),
        $sliderAmount = $("#amount");
    $sliderRange.slider({
        range: true,
        min: 0,
        max: 500,
        values: [50, 300],
        slide: function(event, ui) {
            $sliderAmount.val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $sliderAmount.val("$" + $sliderRange.slider("values", 0) + " - $" + $sliderRange.slider("values", 1));

    /* ------------------  ANIMATION ------------------ */

    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 50, // distance to the element when triggering the animation (default is 0)
        mobile: false, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
    
    if($("#sendmail").length) {
        $.validator.methods.email = function( value, element ) {
                return this.optional( element ) || /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test( value );
        }

        $("#sendmail").validate({
              rules: {
                    'contact-name': "required",
                    'contact-email': {
                      required: true,
                      email: true
                    },
                    'contact-message': "required",
                    'g-recaptcha-response': "required",
              },
              messages: {
                    'contact-name': "Please specify your name",
                    'contact-email': {
                      required: "We need your email address to contact you",
                      email: "Your email address must be in the format of name@domain.com"
                    },
                    'contact-message': "Please specify your messages"
              },
             focusCleanup: true,
             submitHandler: function(form, event) {
               event.preventDefault();
               $.ajax({
                        url:'/assets/exchange/app/requests/email.php',
                        type:'post',
                        dataType: 'json',
                        data: $(form).serialize(),
                        success:function(result){
                                if (result.status == 1){
                                    //grecaptcha.reset();
                                    $("#sendmail").trigger("reset");
                                }                            
                            $(".contact-result").html(result.html);
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            $(".contact-result").text(textStatus);
                        }
             });
             //
             return false;
             }
        });
    }
}(jQuery));
