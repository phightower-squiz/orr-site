define([ 
  'jquery'
  ], 
  function($) {
  	var twitterFormat = {
  		options: {

  		},
  		init: function() {
  			var self = this;
  			$('.twitter-text').each(function(){
					var text = $(this).text();

					
					text = text.replace(/http([^ ]+)/g, "<a href='http$1'>http$1</a>");
					text = text.replace(/#([^ ]+)/g, "<a href='http://twitter.com/search/%23$1'>#$1</a>");
					text = text.replace(/@([^ ]+)/g, "<a href='http://twitter.com/$1'>@$1</a>");

					$(this).html(text);
	  		});
  		}
  	}
  	twitterFormat.init();
  	return twitterFormat;
  });