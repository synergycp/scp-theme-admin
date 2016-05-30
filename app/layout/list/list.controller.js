/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .controller('ListController', ListController);

  /*ngInject*/
  function ListController (WithSelected) {
    var list = this;

    list.withSelected = WithSelected();
    list.loading = true;
    list.showFooter = false;
    list.checkAll = false;

    list.toggleCheckAll = function () {
    };


    ////////////////

    function todo () {
      list.showFooter = pages.count() > 1 || list.withSelectedOptions.length;
    }
  }

})();
