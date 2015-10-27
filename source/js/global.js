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

// Activate the mobile menu
function mobileMenu(triggerEl) {
	triggerEl.on('click', function(event) {
		event.stopPropagation();
		$('.mainnav').addClass('mobile');

		$('nav').toggleClass('active');
		$('.subnav').css('display','block').removeClass('active');

		addNavMoreIcon($('.mainnav'));

	});
}
function resetMenu() {
	$('.mainnav').removeClass('mobile');
	$('nav').removeAttr('class');
	removeNavMoreIcon();


}
// Add + more icon to items with subnavs
function addNavMoreIcon(el) {
	var itemsArray = el.children('li');
	$('nav ul').each(function() {
		$(this).children('li').each(function(){
			if($(this).children('.subnav').length > 0) {
				$(this).append('<i class="fa fa-plus-circle"></i>');
			}
		});
	});

	navMoreClick();
	
}
// Show subnavs on click
function navMoreClick() {
	$('nav ul li .fa-plus-circle').on('click', function(event){
		event.stopPropagation();

		mobileSubMenu($(this));
	});
}
function removeNavMoreIcon() {
	$('li').find('i').remove();

}
// Show submenus
function mobileSubMenu(clickedMenuItem) {
	if($('.mainnav').hasClass('mobile')) {

		var targetSubNav = clickedMenuItem.parent().children('.subnav');
			if(clickedMenuItem.parent().parent().hasClass('mainnav')) {
				$('nav ul').not(targetSubNav).removeClass('active');
			}

			if(targetSubNav.length > 0 && $('.mainnav').hasClass('mobile')) {
				targetSubNav.toggleClass('active');
				//addNavMoreIcon(targetSubNav);
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
		$('.mainnav').children('.subnav').css('display','none');
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
	
}
function formatTwitterText() {
	$('.twitter-text').each(function(){
		var text = $(this).text();

		
		text = text.replace(/http([^ ]+)/g, "<a href='http$1'>http$1</a>");
		text = text.replace(/#([^ ]+)/g, "<a href='http://twitter.com/search/%23$1'>#$1</a>");
		text = text.replace(/@([^ ]+)/g, "<a href='http://twitter.com/$1'>@$1</a>");

		$(this).html(text);

	});
}
$(document).ready(function() {
	// nav functions
	setMenuFunctions();
	// accordion
	$('.accordion').UberAccordion({
    buttonClass: 'accordion__link'
	});
	
	$( window ).resize(function() {
		// re-init menu functions
		resetMenu();
		setMenuFunctions();
		
	});
	
formatTwitterText();
});

// initiate sliders
$(window).load(function(){
	$('.main-slider').slick({
		slidesToShow: 1,
		dots: true,
		autoplay: true,
		appendArrows: $(".slider-nav"),
		appendDots: $(".slider-nav"),
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
		pauseOnHover: false,
		fade: true

	});

	$('.slick-pause').on('click', function(){
		$('.main-slider').slick('slickPause');
		$(this).css('display', 'none');
		$('.slick-play').css('display', 'inline-block');
	});
	$('.slick-play').on('click', function(){
		$('.main-slider').slick('slickPlay');
		$(this).css('display', 'none');
		$('.slick-pause').css('display', 'inline-block');
	});
	$('.twitter-block').slick({
		slidesToShow: 3,
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
		
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
