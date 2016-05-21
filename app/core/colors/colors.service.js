/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.core.colors')
    .service('Colors', Colors);

  Colors.$inject = ['APP_COLORS'];

  function Colors(APP_COLORS) {
    this.byName = byName;

    ////////////////

    function byName(name) {
      return (APP_COLORS[name] || '#fff');
    }
  }

})();
