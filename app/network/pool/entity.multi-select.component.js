(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .component('entityMultiSelect', {
      require: {
      },
      bindings: {
        select: '<',
        placeholder: '@',
        allowMultipleVlans: '<',
      },
      controller: 'EntityMultiSelectCtrl as select',
      transclude: true,
      templateUrl: 'app/network/entity/entity.multi-select.html'
    })
    .controller('EntityMultiSelectCtrl', EntityMultiSelectCtrl)
    ;

  /**
   * @ngInject
   */
  function EntityMultiSelectCtrl() {
    var select = this;

    select.$onInit = init;
    select.filter = filter;

    //////////

    function init() {
      select.allowMultipleVlans = select.allowMultipleVlans || false;
    }

    function filter(item) {
      var selected = select.select.selected;
      if (!selected.length) {
        return true;
      }

      if (!select.select.notSelected(item)) {
        return false;
      }

      // NOTE: this group/VLAN logic must also be implemented by the parent because of pagination on the results.
      if (selected[0].group.id !== item.group.id) {
        return false;
      }

      if (!select.allowMultipleVlans && selected[0].vlan !== item.vlan) {
         return false;
      }

      return true;
    }
  }
})();
