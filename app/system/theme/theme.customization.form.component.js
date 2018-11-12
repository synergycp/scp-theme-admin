(function () {
  'use strict';

  var INPUTS = {
    main_bg: '',
    custom_css: '',
    nav_bg: '',
    side_nav_bg: '',
    panel_bg: '',
    panel_alt_bg: '',
    logo: '',
    link_color: '',
    text_color: '',
  };

  angular
    .module('app.system.theme')
    .component('themeCustomizationForm', {
      require: {
      },
      bindings: {
        form: '=',
        isCreationMode: '@'
      },
      controller: 'ThemeCustomizationFormCtrl as customizeForm',
      transclude: true,
      templateUrl: 'app/system/theme/theme.customization.form.html',
    })
    .controller('ThemeCustomizationFormCtrl', ThemeCustomizationFormCtrl)
    ;

  /**
   * @ngInject
   */
  function ThemeCustomizationFormCtrl(_) {
    var customizeForm = this;

    customizeForm.$onInit = init;
    customizeForm.input = _.clone(INPUTS);

    //////////

    function init() {
      customizeForm.form.getData = getData;
      fillFormInputs();

      (customizeForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(customizeForm.input);
    }

    function fillFormInputs() {
      _.overwrite(customizeForm.input, customizeForm.form.input);
    }
  }
})();
