(function () {
  'use strict';

  var TYPE = {
    V4: parseInt('01', 2),
    V6: parseInt('10', 2),
  };

  var TYPES = {
    V4: TYPE.V4,
    V6: TYPE.V6,
    BOTH: TYPE.V4 | TYPE.V6,
  };

  var INPUTS = {
    name: '',
    billing_id: '',
    vlan: '',
    v4: {
      address: '',
      gateway: '',
      subnet_mask: '',
      range_end: '',
    },
    v6: {
      address: '',
      gateway: '',
    },
  };

  var TYPE_V4 = {
    SINGLE: 1,
    RANGE: 2,
  };

  angular
    .module('app.network')
    .component('entityForm', {
      require: {
      },
      bindings: {
        edit: '=',
        input: '=',
      },
      controller: 'EntityFormCtrl as entityForm',
      transclude: true,
      templateUrl: 'app/network/entity/entity.form.html'
    })
    .controller('EntityFormCtrl', EntityFormCtrl)
    ;

  /**
   * @ngInject
   */
  function EntityFormCtrl(_) {
    var entityForm = this;

    entityForm.types = TYPES;
    entityForm.type = TYPE.V4;
    entityForm.v4 = {
      type: TYPE_V4.SINGLE,
      types: TYPE_V4,
      is_single: true,
      is_range: false,
      onTypeChange: onV4TypeChange,
      range_end: '',
      onRangeChange: onV4RangeChange,
    };
    entityForm.$onInit = init;
    entityForm.onTypeChange = onTypeChange;

    activate();

    //////////

    function activate() {
      onTypeChange();
    }

    function onV4TypeChange() {
      entityForm.v4.is_single = entityForm.v4.type === TYPE_V4.SINGLE;
      entityForm.v4.is_range = !entityForm.v4.is_single;

      entityForm.v4.range_end = entityForm.v4.type === TYPE_V4.RANGE ?
        entityForm.input.v4.range_end.match(/\d+$/).pop() :
        null;
      onV4RangeChange();
    }

    function onTypeChange() {
      entityForm.showV4 = entityForm.type & TYPE.V4;
      entityForm.showV6 = entityForm.type & TYPE.V6;
    }

    function init() {
      _.assign(entityForm.input, INPUTS);

      if (entityForm.edit) {
        entityForm.edit.on('load', updateTypeFromInput);
        entityForm.edit.on('change', updateTypeFromInput);
      }
    }

    function onV4RangeChange() {
      if (entityForm.v4.type === TYPE_V4.SINGLE) {
        entityForm.input.v4.range_end = null;

        return;
      }

      var first3 = entityForm.input.v4.address.match(/\d+.\d+.\d+/).pop();
      entityForm.input.v4.range_end = first3+'.'+entityForm.v4.range_end;
    }

    function updateTypeFromInput() {
      entityForm.type = getTypeFromInput();
      onTypeChange();

      entityForm.v4.type = getV4TypeFromInput();
      onV4TypeChange();
    }

    function getTypeFromInput() {
      var isV6 = entityForm.input.v6 && entityForm.input.v6.address;
      var isV4 = entityForm.input.v4 && entityForm.input.v4.address;

      return (isV6 ? TYPE.V6 : 0) | (isV4 ? TYPE.V4 : 0);
    }

    function getV4TypeFromInput() {
      var input = entityForm.input;

      return input.v4.range_end && input.v4.range_end != input.v4.address ?
        TYPE_V4.RANGE :
        TYPE_V4.SINGLE;
    }
  }
})();
