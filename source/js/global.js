
/*
--------------------
Modules
--------------------
*/

require.config({
  paths: {
    "jquery": "vendor/jquery.min"
  }
});
require([
	'jquery',
	//'modules/accordion',
	'modules/menus',
	'modules/sliders',
	'modules/twitterformat',
	'modules/fbsearch'
	
	],
	function($){
		$(document).ready(function() {
	
			//  Declare JS Enabled. 
			$('body').removeClass('no-js').addClass('js-enabled');

		});
	});
