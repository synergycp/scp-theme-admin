(function () {
  'use strict';

  angular
    .module('app.pxe.driver')
    .factory('PxeDriverList', PxeDriverListFactory);

  /**
   * PxeProfileList Factory
   *
   * @ngInject
   */
  function PxeDriverListFactory (List, ListConfirm, Api, ApiKey, ApiUpload) {
    return function () {
      var list = List('pxe/driver');
      list.confirm = ListConfirm(list, 'pxe.driver.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      list.create = function(data) {
        if(data.driver) {
          var url = Api.baseUrl()+'api/pxe/driver?key='+ApiKey.get();
          ApiUpload.post(url, data.driver, data).then(function() {
            list.load();
          })

        } 
      }

      return list;
    };
  }
})();
