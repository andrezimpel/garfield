/* ========================================================================
 * Garfield: garfield.js 0.0.4
 * http://www.github.com/andrezimpel/garfield
 * ========================================================================
 * Copyright 2015 Andre Zimpel
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // GARFIELD CLASS DEFINITION
  // ======================

  var Garfield = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.loaded           = false

    // sizes
    if (this.$element.attr('sizes')) {
      var sizesArr = this.$element.attr('sizes').split(', ');
      this.sizes = $.map(sizesArr, function(val, i){
        var regex = new RegExp(/\w*px/)
        var minWidth = val.split(') ')[0].match(regex)[0]
        var size = val.split(') ')[1]

        return {min: minWidth, size: size}
      })
    }
  }

  Garfield.VERSION  = '0.0.1'

  Garfield.DEFAULTS = {
    'offsets': {
      top: 200,
      bottom: 200
    }
  }

  Garfield.prototype.prepare = function () {
    var $element = this.$element
    var that = this

    // remove garfield class
    $element.removeClass('garfield')

    // install watcher
    var elementWatcher = scrollMonitor.create($element, this.options.offsets);

    elementWatcher.enterViewport(function() {
      that.loadImage();
    });
  }

  Garfield.prototype.loadImage = function () {
    var $element = this.$element
    var src = $element.data('src')
    var srcSet = $element.data('srcset')

    $element.attr('src', src)
    $element.attr('srcset', srcSet)
    $element.addClass('garfielded')

    this.loaded = true
  }


  // GARFIELD PLUGIN DEFINITION
  // =======================

  function Plugin(option, data) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('garfield')
      var options = $.extend({}, Garfield.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('garfield', (data = new Garfield(this, options)))
      data.prepare()
    })
  }

  var old = $.fn.garfield

  $.fn.garfield             = Plugin
  $.fn.garfield.Constructor = Garfield


  // GARFIELD NO CONFLICT
  // =================

  $.fn.garfield.noConflict = function () {
    $.fn.garfield = old
    return this
  }


  // GARFIELD DATA-API
  // ==============

  $(document).ready(function () {
    $('img[data-behavior="garfield-lasagne"]').each(function(){
      var $this = $(this)
      Plugin.call($this, $this.data())
    });
  })

}(jQuery);
