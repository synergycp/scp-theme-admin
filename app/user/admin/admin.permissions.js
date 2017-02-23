(function () {
  'use strict';

  angular
    .module('app.user.admin')
    .controller('AdminPermissionsCtrl', AdminPermissionsCtrl)
  ;

  /**
   * @ngInject
   */
  function AdminPermissionsCtrl($state, Api, _, Loader, PermissionLang) {
    var vm = this;
    var $api;

    vm.map = {};
    vm.loader = Loader();

    vm.submit = submit;
    vm.$onInit = init;

    //////////

    function init() {
      $api = Api.one('admin/'+$state.params.id+'/permission');

      vm.loader.during(
        $api
          .get()
          .then(storeMap)
      );
    }

    function storeMap(response) {
      _.merge(vm.map, response.getOriginalData());
      PermissionLang.load(vm.map);
    }

    function submit() {
      vm.loader.during(
        $api.patch(vm.map)
      );
    }
  }
})();
