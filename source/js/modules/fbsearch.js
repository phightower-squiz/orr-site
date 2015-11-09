define([ 
  'jquery'
  ], 
  function($) {
  	var funnelBackSearch = {
  		options: {

  		},
  		init: function() {
  			var self = this;
  			$('#search-results li.search-tier').remove();
				$('#search-results > li').each(function(){
					var url = $(this).attr('data-fb-result');
					$(this).children('h4').children('a').attr('href', url);
				});
  		}
  	}
  	funnelBackSearch.init();
  	return funnelBackSearch;
  });