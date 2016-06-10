(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .controller('ListCtrl', ListCtrl);

  /**
   * @ngInject
   */
  function ListCtrl (_, $timeout) {
    var listCtrl = this;

    listCtrl.toggleCheckAll = toggleCheckAll;
    listCtrl.checkAllToggled = checkAllToggled;
    listCtrl.checkAll = false;

    listCtrl.$onInit = init;

    ////////////////

    function init() {
      // alias service parts
      listCtrl.pages = listCtrl.list.pages;
      listCtrl.bulk = listCtrl.list.bulk;
      listCtrl.items = listCtrl.list.items;
      listCtrl.bulk.on('apply', checkAllToggled);
      listCtrl.list.on('change', checkAllToggled);
    }

    function toggleCheckAll() {
      _.each(listCtrl.items, function (item) {
        item.checked = listCtrl.checkAll;
      });
    }

    function checkAllToggled() {
      // TODO: cleaner way of doing this?
      $timeout(function() {
        listCtrl.checkAll = listCtrl.items.length &&
          _.every(listCtrl.items, 'checked');
      });
    }
  }

})();
