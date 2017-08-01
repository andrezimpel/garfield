/* ========================================================================
 * Garfield: garfield.js 0.1.2
 * http://www.github.com/andrezimpel/garfield
 * ========================================================================
 * Copyright 2017 Andre Zimpel
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
    this.loaded              = false
  }

  Garfield.VERSION  = '0.1.2'

  Garfield.DEFAULTS = {
    'offsets': {
      top: 400,
      bottom: 400
    },
    dataSrcSetAttribute: 'data-srcset',
    dataSrcAttribute: 'data-src',
    unloadedCssClass: 'garfield',
    loadedCssClass: 'garfielded'
  }

  Garfield.prototype.prepare = function () {
    var options       = this.options
    var $element      = this.$element
    var $observer     = $element
    var that          = this
    var $parent       = $element.parent()[0]

    // check if the parent is within the picture element - this would prevent scrollMonitor from detecting propperly
    if ($parent.tagName == 'PICTURE') {
      $observer = $parent
    }


    // install watcher
    var elementWatcher = scrollMonitor.create($observer, this.options.offsets);

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
