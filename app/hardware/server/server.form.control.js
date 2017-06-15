(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .factory('ServerFormControl', ControlFactory)
  ;

  /**
   * @ngInject
   * @constructor
   */
  function ControlFactory(Select, $stateParams, $q, date, moment, Api) {
    return function () {
      return new Control(Select, $stateParams, $q, date, moment, Api);
    };
  }

  /**
   * @constructor
   */
  function Control(Select, $stateParams, $q, date, moment, Api) {
    var control = this;

    control.input = {
      ip: '',
      admin: {
        username: '',
        password: '',
      },
      client: {
        username: '',
        password: '',
      }
    };
    control.type = Select('server/control/type').on('change', syncTypeFilter);

    control.$setPristine = $setPristine;
    control.data = data;
    control.fromExisting = fromExisting;

    function $setPristine() {
      control.type.$dirty = false;
    //   port.switch.port.$dirty =
    //     port.switch.speed.$dirty =
    //     port.entities.$dirty =
    //     port.group.$dirty =
    //     port.switch.$dirty =
    //     false;
    //   _.setContents(
    //     port.entities.original,
    //     port.entities.selected
    //   );
    }

    function syncTypeFilter() {
      control.type
        .filter({
          type: control.type.getSelected('id'),
        })
        .load()
      ;
    }

    function fromExisting(response) {
      control.id = response.id;
      control.input.ip = response.ip;
      control.input.client.username = response.client_user;
      control.input.client.password = response.client_password;
      control.input.admin.username = response.admin_user;
      control.input.admin.password = response.admin_password;      

      if (control.type.getSelected('id') != response.type.id) {
        control.type.selected = response.type;
        syncTypeFilter();
      }
    }

    
    function data() {
      return {
        id: control.id,
        ip: control.input.mac,
        client_user: control.input.client.username, 
        client_password: control.input.client.password, 
        admin_user: control.input.admin.username, 
        admin_password: control.input.admin.password, 
        type: control.type.getSelected('id'),
      };
    }
  }
})();

