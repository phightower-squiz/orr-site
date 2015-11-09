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

var ORR = ORR || {};
ORR.event = {};

ORR.initMenus = {
	init: {
		isMobile: false,
		mainNavClass: '.mainnav',
		navWrapper: 'nav',
		subNavClass: '.subnav'
	},
	testFunc: function(name){
		
    console.log('test  ' + this.init.isMobile);
  },
  // set to mobile and show the submenus
  mobileMenu: function(trigger) {
  	$(this.init.mainNavClass).addClass('mobile');
		$(this.init.navWrapper).toggleClass('active');
		$(this.init.subNavClass).css('display','block').removeClass('active');
		this.removeNavMoreIcon();
		this.init.isMobile = true;
		this.subNavAdjust($(this.init.navWrapper + ' > ul > li'));
		return false;

  },
  // mobile: add the more icon to each nav with subnavs
  addNavMoreIcon: function(el) {
  	var self = this;
  	var itemsArray = el.children('li');
		$(this.init.navWrapper + ' ul').each(function() {
			$(this).children('li').each(function(){
				if($(this).children(self.init.subNavClass).length > 0) {
					$(this).append('<i class="fa fa-plus-circle"></i>');
				}
			});
		});
  },
  removeNavMoreIcon: function() {
  	$('.mainnav .fa-plus-circle').remove();
  },
  // mobile: show the submenus when clicking the more icon
  mobileSubMenu: function(clickedMenuItem){
  	if($(this.init.mainNavClass).hasClass('mobile')) {
				var targetSubNav = clickedMenuItem.parent().children(this.init.subNavClass);
				if(clickedMenuItem.parent().parent().hasClass(this.init.mainNavClass.substring(1))) {
					$(this.init.navWrapper + ' ul').not(targetSubNav).removeClass('active');
				}

				if(targetSubNav.length > 0 && $(this.init.mainNavClass).hasClass('mobile')) {
					targetSubNav.toggleClass('active');
				}
		}
  },
  // desktop: show submenus on hover
  subNavHover: function(hoverEl) {
  	var self = this;
  	var targetEl;
		hoverEl.hover(
			function(){
				if(!$(self.init.mainNavClass).hasClass('mobile')) {
					targetEl = $(this).children(self.init.subNavClass);
					if(targetEl.length > 0) {
						targetEl.fadeIn();
					}
				}
					
			},
				function(){
					if(!$(self.init.mainNavClass).hasClass('mobile')) {
						targetEl.fadeOut();
					}
				}
		);
  },
  // desktop: adjust submenu position if it goes outside the width of the screen
  subNavAdjust: function(el) { 
  	var self = this;
		var targetEls = el.children(self.init.subNavClass);
		if(!$(self.init.mainNavClass).hasClass('mobile')) {
			$(self.init.mainNavClass).children(self.init.subNavClass).css('display','none');
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
		else {
			targetEls.css('left', 0);
		}

	},
	setMenuFunctions: function() {
		this.subNavHover($(this.init.navWrapper + ' > ul > li'));
		this.subNavAdjust($(this.init.navWrapper + ' > ul > li'));
	},
	resetMenus: function() {
		if(this.init.isMobile) {
			this.init.isMobile = false;
			$(this.init.mainNavClass).removeClass('mobile');
		}
		else {
			$(this.init.subNavClass).css('display','none');
			
		}
		this.removeNavMoreIcon();
		$(this.init.subNavClass).removeClass('active');
		$(this.init.navWrapper).removeClass('active');
		this.setMenuFunctions();
	}
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
function FunnelbackSearchFixes() {
	$('#search-results li.search-tier').remove();
	$('#search-results > li').each(function(){
		var url = $(this).attr('data-fb-result');
		$(this).children('h4').children('a').attr('href', url);
	});
}
function gaTest() {
	// experiment with google analytics


console.log('test ga');
ga('send', 'event', 'tests', 'click-page', 'test label', 'who we are', {'nonInteraction': 1});
}

/*var blah = $.extend(true, {}, ORR.initMenus);

blah.init.isMobile = true;

console.log(blah.init.mainNavClass);
blah.testFunc();*/

/*
--------------------
Global
--------------------
*/

$(document).ready(function() {
	$('.mobile-menu a').on('click', function(event){
		ORR.initMenus.mobileMenu();
		ORR.initMenus.addNavMoreIcon($(ORR.initMenus.init.mainNavClass));
	});

	$('nav').on('click', 'ul li .fa-plus-circle', function(event){
		event.stopPropagation();
		ORR.initMenus.mobileSubMenu($(this));
	});

	ORR.initMenus.setMenuFunctions();
	

	$( window ).resize(function() {
		ORR.initMenus.resetMenus();
		
	});


	// accordion
	$('.accordion').UberAccordion({
	    buttonClass: 'accordion__link'
	});
	formatTwitterText();
	FunnelbackSearchFixes();

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
		slidesToScroll: 3,
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

//  Declare JS Enabled. 
$('body').removeClass('no-js').addClass('js-enabled');

