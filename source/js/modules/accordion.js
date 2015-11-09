define([ 
  'jquery',
  '../modules/plugins/uberAccordion'
  ], 
  function($) {
    var doAccordion = {
      options: {
        el: '.accordion'
      },
      init: function() {
        var self = this;
        $(self.options.el).UberAccordion({
          buttonClass: 'accordion__link'
        });
      }
    }
    doAccordion.init();
    return doAccordion;
});