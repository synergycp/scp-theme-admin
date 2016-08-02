(function () {
  'use strict';

  angular
    .module('app.hardware.switch')
    .factory('SwitchList', SwitchListFactory);

  /**
   * SwitchList Factory
   *
   * @ngInject
   */
  function SwitchListFactory (List) {
    return function () {
        var list = List('switch');

        list.bulk.add('Delete', list.delete);

        return list;
    };
  }
})();
