(function($) {
  $.fn.sticky = function (options) {
    var self = this,
        initialState = {
          position : self.css('position'),
          top : self.css('top'),
          bottom : self.css('bottom'),
          left : self.css('left'),
          right : self.css('right'),
          marginLeft : self.css('margin-left'),
          marginRight : self.css('margin-right'),
          marginTop : self.css('margin-top'),
          marginBottom : self.css('margin-bottom')
        },
        position = initialState.position;

    var settings = $.extend({
      height : self.height(),
      paddingTop : 0,
      paddingBottom : 0,
      boundTop : self.offset().top,
      boundBottom : self.parent().offset().top + self.parent().height(),
      positionLeft : self.offset().left,
      heightParent : self.parent().height(),
      boundTopParent : self.parent().offset().top,
      contain : true,
      animate : false,
      easing : 'linear',
      duration: 500,
    }, options);

    var methods = {
      handleScroll : function() {
        var scrollTop = $(window).scrollTop();

        if(scrollTop > settings.boundTop - settings.paddingTop) {
          if(methods.fixed() && settings.contain && scrollTop > settings.boundBottom - settings.height - settings.paddingTop - settings.paddingBottom) {
            methods.unfixPosition(settings.heightParent - settings.height - settings.paddingBottom);
          } else if((!methods.fixed() || settings.animate) && scrollTop < settings.boundBottom - settings.height - settings.paddingTop - settings.paddingBottom) {
            methods.fixPosition(scrollTop - settings.boundTopParent + settings.paddingTop);
          }
        } else if(methods.fixed()) {
          methods.unfixPosition(initialState.marginTop);
        }
      },
      
      fixPosition : function(marginTop) {
        if(settings.animate) {
          self.
          stop(true, false).
          animate({ marginTop : marginTop }, settings.duration, settings.easing);
        } else {
          self.css({ 
            position : 'fixed',
            margin : 0,
            top : settings.paddingTop,
            left : settings.positionLeft
          });
        }
        position = 'fixed';
      },
      
      unfixPosition : function(marginTop) {
        if(settings.animate) {
          self.
          stop(true, false).
          animate({ marginTop : marginTop }, settings.duration, settings.easing);
        } else {
          self.css($.extend({}, initialState, { position : 'static', marginTop : marginTop }));
        }
        position = initialState.position;
      },
      
      toPixels : function(value) {
        return value + 'px'
      },
      
      fixed : function() {
        return position == 'fixed'
      }
    };
    
    $(window).bind('scroll.sticky', methods.handleScroll);
    if (settings.boundTop < settings.paddingTop) {
      methods.fixPosition();
    }
    return self;
  }
})(jQuery);
