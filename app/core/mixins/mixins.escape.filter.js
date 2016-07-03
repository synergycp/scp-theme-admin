(function () {
  'use strict';

  angular
    .module('app.core.mixins')
    .filter('escape', escapeFilter);

  /**
   * @ngInject
   */
  function escapeFilter() {
    return function (input) {
      if (!input) {
        return '';
      }
      return input.
      replace(/&/g, '&amp;').
      replace(/</g, '&lt;').
      replace(/>/g, '&gt;').
      replace(/'/g, '&#39;').
      replace(/"/g, '&quot;');
    };
  }
})();
