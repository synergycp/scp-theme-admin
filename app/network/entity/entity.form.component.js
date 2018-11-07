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
    nickname: '',
    billing_id: '',
    vlan: '',
    group: null,
    v4: {
      address: '',
      gateway: '',
      subnet_mask: '',
      range_end: '',
      increment_amount: '',
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
      require: {},
      bindings: {
        form: '=',
      },
      controller: 'EntityFormCtrl as entityForm',
      transclude: true,
      templateUrl: 'app/network/entity/entity.form.html',
    })
    .controller('EntityFormCtrl', EntityFormCtrl)
  ;

  /**
   * @ngInject
   */
  function EntityFormCtrl(_, Api) {
    var entityForm = this;
    var $groups = Api.all('group');

    entityForm.types = TYPES;
    entityForm.type = TYPE.V4;
    entityForm.input = _.clone(INPUTS);
    entityForm.v4 = {
      increment_vlan: '',
      is_bulk: '',
      type: TYPE_V4.SINGLE,
      types: TYPE_V4,
      is_single: true,
      is_range: false,
      onTypeChange: onV4TypeChange,
      range_end: '',
      onRangeChange: function () {
      },
    };
    entityForm.$onInit = init;
    entityForm.onTypeChange = onTypeChange;

    entityForm.groups = {
      items: [],
      load: loadGroups,
    };

    activate();

    //////////

    function activate() {
      onTypeChange();
    }

    function onV4TypeChange() {
      entityForm.v4.is_single = entityForm.v4.type === TYPE_V4.SINGLE;
      entityForm.v4.is_range = !entityForm.v4.is_single;
    }

    function onTypeChange() {
      entityForm.showV4 = entityForm.type & TYPE.V4;
      entityForm.showV6 = entityForm.type & TYPE.V6;
    }

    function init() {
      fillFormInputs();
      entityForm.form.getData = getData;

      if (entityForm.form.on) {
        entityForm.form
          .on('created', incrementBulk)
          .on('load', updateTypeFromInput)
          .on('change', updateTypeFromInput)
        ;
      }
    }

    function fillFormInputs() {
      _.overwrite(entityForm.input, entityForm.form.input);
    }

    function getData() {
      var data = _.clone(entityForm.input);

      data.v4 = getV4Data();
      data.v6 = getV6Data();

      return data;
    }

    function getV6Data() {
      if (!(entityForm.type & TYPE.V6)) {
        return {
          address: null,
          gateway: null,
        };
      }

      return entityForm.input.v6;
    }

    function getV4Data() {
      if (!(entityForm.type & TYPE.V4)) {
        return {
          address: null,
          gateway: null,
          subnet_mask: null,
        };
      }

      var input = _.clone(entityForm.input.v4 || {});

      input.range_end = getV4RangeEnd();

      return input;
    }

    function getV4RangeEnd() {
      if (!entityForm.v4 || entityForm.v4.type === TYPE_V4.SINGLE) {
        return;
      }

      if (!entityForm.v4.range_end) {
        return entityForm.v4.range_end;
      }

      var countDots = (entityForm.v4.range_end.match(RegExp('\\.', 'g')) || []).length;

      var rules = ['\\d+.', '\\d+.', '\\d+'];

      rules.splice(0, countDots);

      var pattern = rules.join("");

      if (pattern) {
        var part = entityForm.input.v4.address.match(pattern)
          .pop();

        return part + '.' + entityForm.v4.range_end;
      }

      return entityForm.v4.range_end;
    }

    function updateTypeFromInput() {
      fillFormInputs();

      entityForm.type = getTypeFromInput();
      onTypeChange();

      entityForm.v4.type = getV4TypeFromInput();
      onV4TypeChange();

      entityForm.v4.range_end = getV4RangeEndFromInput();
    }

    function getTypeFromInput() {
      var isV6 = entityForm.input.v6 && entityForm.input.v6.address;
      var isV4 = entityForm.input.v4 && entityForm.input.v4.address;

      return (isV6 ? TYPE.V6 : 0) | (isV4 ? TYPE.V4 : 0);
    }

    function getV4TypeFromInput() {
      var input = entityForm.input;

      return input.v4.range_end != input.v4.address ?
        TYPE_V4.RANGE :
        TYPE_V4.SINGLE;
    }

    function getV4RangeEndFromInput() {
      var rangeEnd = entityForm.input.v4.range_end;

      if (!rangeEnd) {
        return;
      }

      var sep = '.';
      var exp = entityForm.input.v4.range_end.split(sep);
      var last = exp.pop();
      var first = exp.join(sep) + sep;

      if (entityForm.input.v4.address.substr(0, first.length) === first) {
        return last;
      }

      return entityForm.input.v4.range_end;
    }

    function loadGroups(search) {
      return $groups
        .getList({q: search})
        .then(storeGroups)
        ;
    }

    function storeGroups(groups) {
      _.setContents(entityForm.groups.items, groups);
    }

    function incrementBulk() {
      var is_bulk = entityForm.v4.is_bulk;
      var increment_vlan = entityForm.v4.increment_vlan;
      var ip_increment = entityForm.input.v4.increment_amount;

      if (is_bulk) {
        if (ip_increment) {
          var wholeIP = entityForm.input.v4.address;
          var ip = wholeIP.split('.');
          var last = parseInt(ip.pop());
          last += ip_increment;
          ip.push(last);
          entityForm.input.v4.address = ip.join('.');

          entityForm.v4.range_end = (parseInt(entityForm.v4.range_end) + parseInt(ip_increment)).toString();

          //nickname
          var wholeName = entityForm.input.nickname;
          ip = wholeName.split('/')[0].split('.');
          last = parseInt(ip.pop());
          last += ip_increment;
          ip.push(last);
          var end = wholeName.split('/')[1];

          if (last === parseInt(last, 10) && end == parseInt(end, 10)) {
            entityForm.input.nickname = ip.join('.')+'/'+wholeName.split('/')[1];
          }

          if (increment_vlan) {
            entityForm.input.vlan++;

            wholeIP = entityForm.input.v4.gateway;
            ip = wholeIP.split('.');
            last = parseInt(ip.pop());
            last += ip_increment;
            ip.push(last);
            entityForm.input.v4.gateway = ip.join('.');
          }
        }
      }
    }

    function deleteThis() {
      var val = $('#form-nickname').val();
      var ip = val.split('/')[0].split('.');
      var last = parseInt(ip.pop());
      last += ADD;
      ip.push(last);
      $('#form-nickname').val(ip.join('.')+'/'+val.split('/')[1]).trigger('input');

      $('#form-vlan').val(parseInt($('#form-vlan').val())+VLAN_ADD).trigger('input');

      val = $('input[ng-model="entityForm.input.v4.address"]').val().split('.');
      val.push(parseInt(val.pop()) + ADD);
      $('input[ng-model="entityForm.input.v4.address"]').val(val.join('.')).trigger('input');

      $('input[ng-model="entityForm.v4.range_end"]').val(
          parseInt($('input[ng-model="entityForm.v4.range_end"]').val())+ADD
      ).trigger('input');

      val = $('input[ng-model="entityForm.input.v4.gateway"]').val().split('.');
      val.push(parseInt(val.pop()) + (VLAN_ADD ? ADD : 0));
      $('input[ng-model="entityForm.input.v4.gateway"]').val(val.join('.')).trigger('input');

      $('form[ng-submit="vm.create.submit()"]').triggerHandler('submit');
    }
  }
})();
