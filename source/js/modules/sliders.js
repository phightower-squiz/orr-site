define([ 
  'jquery',
  '../modules/plugins/slick'
  ], 
  function($) {
    var makeSlider = {
      options: {
        
      },
      init: function() {
        
      },
      theSliders: function() {
        var self = this;
        $(document).ready(function() {
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
        
      }
      
    }
    makeSlider.theSliders();
    return makeSlider;
});