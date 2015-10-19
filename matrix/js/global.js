/*global jQuery*/
/**
 * orr-site
 * Global JS
 *
 * version: 0.0.1
 * file:    global.js
 * author:  Squiz Australia
 * change log:
 *     19-10-2015 13:08 - First revision
 */

/*
 * Table of Contents
 *
 * - Global
 * - Modules

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
		$('.subnav').css('display','block').removeClass('active').removeAttr('style');
		/*if($('nav').hasClass('active')) {
			$('nav').removeClass('active');
		}
		else {
			$('nav').addClass('active');
		}*/

		addNavMoreIcon($('.mainnav'));

	});
}
function resetMenu() {
	$('.mainnav').removeClass('mobile');
	$('nav').removeAttr('class');
	removeNavMoreIcon();


}
function addNavMoreIcon(el) {
	var itemsArray = el.children('li');
	itemsArray.each(function() {
		if($(this).children('.subnav').length > 0) {
			$(this).append('<i class="fa fa-plus-circle"></i>');
		}
	});
}
function removeNavMoreIcon() {
	$('li').find('i').remove();

}
function mobileSubMenu(clickedMenuItem) {
	if($('.mainnav').hasClass('mobile')) {
		var targetSubNav = clickedMenuItem.children('.subnav');
			if(clickedMenuItem.parent().hasClass('mainnav')) {
				$('nav ul').not(targetSubNav).removeClass('active');
			}

			if(targetSubNav.length > 0 && $('.mainnav').hasClass('mobile')) {
				targetSubNav.toggleClass('active');
				addNavMoreIcon(targetSubNav);
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
		$('.subnav').css('display','none');
		targetEls.each(function() {

			// adjust position if over edge of window
			var subNavWidth = $(this).width();
			var winWidth = $(window).width();
			var subNavPos = $(this).parent().position();
			var subNavPosLeft = subNavPos.left;

			if(subNavPosLeft + subNavWidth > winWidth) {
				var diff = (subNavPosLeft + subNavWidth) - winWidth;
				$(this).css('left', (subNavPosLeft - (diff + 25)) + 'px');
			}

		});
	}
	
}
function setMenuFunctions() {
	subNavHover($('nav > ul > li'));
	subNavAdjust($('nav > ul > li'));
	mobileMenu($('.mobile-menu a'));
	$('nav ul li').on('click', function(event){
		event.stopPropagation();
		mobileSubMenu($(this));
	});
}
$(document).ready(function() {
	// nav functions
	setMenuFunctions();
	// accordion
	$('.accordion').UberAccordion({
    buttonClass: 'accordion__link'
	});
	// just for testing style of active menu item
	$('.sidenav > .subnav > li:first-child > a').addClass('active');

	$( window ).resize(function() {
		// re-init menu functions
		resetMenu();
		setMenuFunctions();
		
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
