/*global jQuery*/
/**
 * {{name}}
 * Global JS
 *
 * version: {{version}}
 * file:    {{file}}
 * author:  Squiz Australia
 * change log:
 *     {{date}} - First revision
 */

/*
 * Table of Contents
 *
 * - Global
 * - Modules
{{toc}}
 */

/*
--------------------
Global
--------------------
*/
//  Declare JS Enabled. 
$('body').removeClass('no-js').addClass('js-enabled');


/*
--------------------
Modules
--------------------
*/
function mobileMenu(eventEl) {
	eventEl.on('click', function() {

		$('.mainnav').addClass('mobile');
		subMenus($('nav ul > li'));

		/*if(!$('nav').hasClass('shown')) {
			$('nav').addClass('shown');
		}
		else {
			$('nav').removeClass('shown');
		}*/
		$('nav').toggleClass('active');
		
		//subNavClick($('.mobile > li'));
		
	});
}
function subMenus(eventEl) {
	var targetEl;
	eventEl.on('click', function() {
		//$('.subnav').removeClass('active')
		targetEl = $(this).children('.subnav');

		if(targetEl.length > 0) {
			targetEl.toggleClass('active');
		}
	});

}
function subNavClick(clickEl) {
	var targetEl;
	clickEl.on('click', function() {
		targetEl = $(this).children('.subnav');

		if(targetEl.length > 0) {
			targetEl.stop(true, true).slideToggle();
		}
	});
	
}
function subNavHover(hoverEl) {
	var targetEl;
		hoverEl.hover(
			function(){
				if(!$('.mainnav').hasClass('mobile')) {
					targetEl = $(this).children('.subnav');
					if(targetEl.length > 0) {
						targetEl.fadeIn();
					}
				}
					
			},
				function(){
					if(!$('.mainnav').hasClass('mobile')) {
						targetEl.fadeOut();
					}
				}
		);
	
}

function subNavAdjust(el) {
	var targetEls = el.children('.subnav');
	if(!$('.mainnav').hasClass('mobile')) {
		targetEls.each(function() {

			// adjust position if over edge of window
			var subNavWidth = $(this).width();
			var winWidth = $(window).width();
			var subNavPos = $(this).parent().position();
			var subNavPosLeft = subNavPos.left;

			if(subNavPosLeft + subNavWidth > winWidth) {
				var diff = (subNavPosLeft + subNavWidth) - winWidth;
				$(this).css('left', (subNavPosLeft - diff) + 'px');
			}

		});
	}
	
}
$(document).ready(function() {

	subNavHover($('nav > ul > li'));
	subNavAdjust($('nav > ul > li'));
	mobileMenu($('.mobile-menu a'));


});
$(window).load(function(){
	$('.main-slider').slick({
		slidesToShow: 1,
		dots: true,
		autoplay: true,
		appendArrows: $(".slider-nav"),
		appendDots: $(".slider-nav"),
		nextArrow: '<button type="button" class="slick-next">></button>',
		prevArrow: '<button type="button" class="slick-prev"><</button>',

	});
	$('.slick-pause').on('click', function(){
		$('.main-slider').slick('slickPause');
	});
	$('.twitter-block').slick({
		slidesToShow: 3,
		nextArrow: '<button type="button" class="slick-next">></button>',
		prevArrow: '<button type="button" class="slick-prev"><</button>',
		responsive: [
	    
	    {
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }

	  ]
	});
});
