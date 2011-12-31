(function($) {
  $.fn.sticky = function (options) {
    var self = this;
    var settings = $.extend({
      height : self.height(),
      topPadding : 50,
      topBound : self.offset().top,
      leftPosition : self.offset().left,
      parentHeight : self.parent().height(),
      parentTopBound : self.parent().offset().top,
      contain : true,
      animate : false
    }, options);

    var methods = {
      handleScroll : function() {
        var scrollTop = $(window).scrollTop(),
            fixed = self.css('position') == 'fixed';
        if(scrollTop > settings.topBound - settings.topPadding) {
          if(fixed && settings.contain && scrollTop > settings.parentTopBound + settings.parentHeight - settings.topPadding - settings.height) {
            methods.unfixPosition(settings.parentHeight - settings.height);
            fixed = false;
          } else if(!fixed && scrollTop < settings.parentTopBound + settings.parentHeight - settings.height - settings.topPadding) {
            methods.fixPosition();
            fixed = true;
          }
        } else {
          methods.unfixPosition(0);
          fixed = false;
        }
      },
      fixPosition : function() {
        self.css({ 
          position: 'fixed',
          top: settings.topPadding + 'px',
          marginTop: 0,
          left: settings.leftPosition 
        });
      },
      unfixPosition : function(topMargin) {
        self.css({
          position: 'static',
          marginTop: topMargin + 'px'
        });
      }
    }
    $(window).bind('scroll.sticky', methods.handleScroll);
    
    if (settings.topBound < settings.topPadding) {
      methods.fixPosition();
    }
    return self;
  }
})(jQuery);
