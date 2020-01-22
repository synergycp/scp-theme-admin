(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('SwitchEditCtrl', SwitchEditCtrl)
    ;

  /**
   * Edit Switch Controller
   *
   * @ngInject
   */
  function SwitchEditCtrl(Edit, $stateParams, $q, Api) {
    var vm = this;

    vm.target = {
      id: $stateParams.id,
    };
    var $uplinks = Api.all('switch/'+vm.target.id+'/uplink');

    vm.edit = Edit('switch/'+$stateParams.id);
    vm.edit.submit = submit;
    vm.edit.on('load', storeCurrent);

    vm.logs = {
      filter: {
        target_type: 'switch',
        target_id: $stateParams.id,
      },
    };

    activate();

    //////////

    function activate() {
      vm.edit.getCurrent();
    }

    function storeCurrent(response) {
      _.assign(vm.target, response);
    }

    function submit() {
      var data = vm.edit.getData();
      vm.edit.loader.during($q.all(_.flatten([
        _.map(data.uplinks.add, addUplink),
        _.map(data.uplinks.remove, removeUplink)
      ])).then(function () {
        return vm.edit.patch(data.switch);
      }));
    }

    function addUplink(uplink) {
      // Errors with adding one uplink shouldn't kill the whole promise.
      return $uplinks.post(uplink).catch(function () {  });
    }

    function removeUplink(uplink) {
      // Errors with removing one uplink shouldn't kill the whole promise.
      return $uplinks.one(''+uplink.id).remove().catch(function () {  });
    }
  }
})();
