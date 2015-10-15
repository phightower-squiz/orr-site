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


function mobileMenu(triggerEl) {
	triggerEl.on('click', function(event) {
		event.stopPropagation();
		$('.mainnav').addClass('mobile');

		$('nav').toggleClass('active');

		addNavMoreArrow($('.mainnav'));

	});
}

function addNavMoreArrow(el) {
	var itemsArray = el.children('li');
	itemsArray.each(function() {
		if($(this).children('.subnav').length > 0) {
			$(this).append('<i class="fa fa-plus-circle"></i>');
		}
	});
}
function mobileSubMenu(clickedMenuItem) {
	if($('.mainnav').hasClass('mobile')) {
		var targetSubNav = clickedMenuItem.children('.subnav');
			if(clickedMenuItem.parent().hasClass('mainnav')) {
				$('nav ul').not(targetSubNav).removeClass('active');
			}

			if(targetSubNav.length > 0 && $('.mainnav').hasClass('mobile')) {
				targetSubNav.toggleClass('active');
				addNavMoreArrow(targetSubNav);
			}
	}
	

}

function subNavHover(hoverEl) { // desktop/wide
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

function subNavAdjust(el) { // desktop/wide
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
	// nav functions
	subNavHover($('nav > ul > li'));
	subNavAdjust($('nav > ul > li'));
	mobileMenu($('.mobile-menu a'));
	$('nav ul li').on('click', function(event){
		event.stopPropagation();
		mobileSubMenu($(this));
	});


});
// initiate sliders
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
