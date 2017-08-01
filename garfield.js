/* ========================================================================
 * Garfield: garfield.js 0.1.1
 * http://www.github.com/andrezimpel/garfield
 * ========================================================================
 * Copyright 2017 Andre Zimpel
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // GARFIELD CLASS DEFINITION
  // ======================

  var Garfield = $.garfield = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.loaded              = false
  }

  Garfield.VERSION  = '0.1.1'

  Garfield.DEFAULTS = {
    'offsets': {
      top: 200,
      bottom: 200
    },
    dataSrcSetAttribute: 'data-srcset',
    dataSrcAttribute: 'data-src',
    unloadedCssClass: 'garfield',
    loadedCssClass: 'garfielded'
  }

  Garfield.prototype.prepare = function () {
    var options = this.options
    var $element = this.$element
    var that = this

    // remove garfield class
    $element.removeClass(options.unloadedCssClass)

    // install watcher
    var elementWatcher = scrollMonitor.create($element, this.options.offsets);

    elementWatcher.enterViewport(function() {
      if (that.loaded === false) {
        that.loadImage()
      }
    });
  }

  Garfield.prototype.loadImage = function () {
    var options = this.options;
    var $element = this.$element
    var src = $element.attr(options.dataSrcAttribute)
    var srcSet = $element.attr(options.dataSrcSetAttribute)

    $element.attr('src', src)
    $element.attr('srcset', srcSet)
    $element.addClass(options.loadedCssClass)

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
    // add support for data-src & data-srcset
    $('[' + Garfield.DEFAULTS.dataSrcAttribute + '], [' + Garfield.DEFAULTS.dataSrcSetAttribute + ']').each(function(){
      var $this = $(this)
      Plugin.call($this, $this.data())
    })
  })

}(jQuery);
