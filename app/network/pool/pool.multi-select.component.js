(function () {
  'use strict';

  angular
    .module('app.network.pool')
    .component('poolMultiSelect', {
      require: {
      },
      bindings: {
        select: '<',
        placeholder: '@',
        allowMultipleVlans: '<',
      },
      controller: 'PoolMultiSelectCtrl as select',
      transclude: true,
      templateUrl: 'app/network/pool/pool.multi-select.html'
    })
    .controller('PoolMultiSelectCtrl', PoolMultiSelectCtrl)
    ;

  /**
   * @ngInject
   */
  function PoolMultiSelectCtrl() {
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
