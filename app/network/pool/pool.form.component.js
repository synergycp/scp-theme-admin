(function () {
  'use strict';

  var TYPE = {
    V4: parseInt('01', 2),
    V6: parseInt('10', 2),
  };

  var TYPES = {
    V4: TYPE.V4,
    V6: TYPE.V6,
  };

  var INPUTS = {
    admin_notes: '',
    name: '',
    billing: {
      id: null,
    },
    vlan: '',
    group: null,
    client: null,
    ipv4: {
      gateway: '',
      increment_amount: '',
      range_start: '',
      range_end: '',
      subnet_mask: '',
    },
    ipv6: {
      gateway: '',
      range_start: '',
      range_end: '',
    },
  };

  angular
    .module('app.network')
    .component('poolForm', {
      require: {},
      bindings: {
        form: '=',
        allowBulkAdd: '<?',
      },
      controller: 'PoolFormCtrl as poolForm',
      transclude: true,
      templateUrl: 'app/network/pool/pool.form.html',
    })
    .controller('PoolFormCtrl', PoolFormCtrl)
  ;

  /**
   * @ngInject
   */
  function PoolFormCtrl(_, Api, Select) {
    var poolForm = this;

    poolForm.client = Select('client')
      .addItem({
        id: 'none',
        text: 'Unassigned'
      });

    poolForm.group = Select('group');

    poolForm.types = TYPES;
    poolForm.type = TYPE.V4;
    poolForm.input = _.clone(INPUTS);
    poolForm.ipv4 = {
      increment_vlan: true,
      is_bulk: '',
      range_end: '',
      onRangeChange: function () {
      },
    };
    poolForm.$onInit = init;
    poolForm.onTypeChange = onTypeChange;

    activate();

    //////////

    function activate() {
      onTypeChange();
    }

    function onTypeChange() {
      poolForm.showV4 = poolForm.type & TYPE.V4;
      poolForm.showV6 = !poolForm.showV4 && (poolForm.type & TYPE.V6);
    }

    function init() {
      fillFormInputs();
      poolForm.form.getData = getData;

      if (poolForm.form.on) {
        poolForm.form
          .on('created', incrementBulk)
          .on('load', updateTypeFromInput)
          .on('change', updateTypeFromInput)
        ;
      }
    }

    function fillFormInputs() {
      _.overwrite(poolForm.input, poolForm.form.input);
      poolForm.group.selected = (poolForm.form.input || {}).group;
      poolForm.client.selected = (poolForm.form.input || {}).owner;
    }

    function getData() {
      var data = _.clone(poolForm.input);

      data.ipv4 = getV4Data();
      data.ipv6 = getV6Data();
      data.client = poolForm.client.selected ? {id: poolForm.client.selected.id} : null;
      data.group = poolForm.group.selected ? {id: poolForm.group.selected.id} : null

      return data;
    }

    function getV6Data() {
      if (!(poolForm.type & TYPE.V6)) {
        return {
          range_start: null,
          range_end: null,
          gateway: null,
        };
      }

      return poolForm.input.ipv6;
    }

    function getV4Data() {
      if (!(poolForm.type & TYPE.V4)) {
        return {
          range_start: null,
          range_end: null,
          gateway: null,
          subnet_mask: null,
        };
      }

      var input = _.clone(poolForm.input.ipv4 || {});

      input.range_end = getV4RangeEnd();

      return input;
    }

    function getV4RangeEnd() {
      if (!poolForm.ipv4) {
        return;
      }

      if (!poolForm.ipv4.range_end) {
        return poolForm.ipv4.range_end;
      }

      var countDots = (poolForm.ipv4.range_end.match(RegExp('\\.', 'g')) || []).length;

      var rules = ['\\d+.', '\\d+.', '\\d+'];

      rules.splice(0, countDots);

      var pattern = rules.join("");

      if (pattern) {
        var part = poolForm.input.ipv4.range_start.match(pattern)
          .pop();

        return part + '.' + poolForm.ipv4.range_end;
      }

      return poolForm.ipv4.range_end;
    }

    function updateTypeFromInput() {
      fillFormInputs();

      poolForm.type = getTypeFromInput();
      onTypeChange();

      poolForm.ipv4.range_end = getV4RangeEndFromInput();
    }

    function getTypeFromInput() {
      var isV6 = poolForm.input.ipv6;
      var isV4 = poolForm.input.ipv4;

      return ((isV6 ? TYPE.V6 : 0) | (isV4 ? TYPE.V4 : 0)) || TYPE.V4;
    }

    function getV4RangeEndFromInput() {
      var rangeEnd = (poolForm.input.ipv4 || {}).range_end;

      if (!rangeEnd) {
        return;
      }

      var sep = '.';
      var exp = poolForm.input.ipv4.range_end.split(sep);
      var last = exp.pop();
      var first = exp.join(sep) + sep;

      if (poolForm.input.ipv4.range_start.substr(0, first.length) === first) {
        return last;
      }

      return poolForm.input.ipv4.range_end;
    }

    function ipHandler(wholeIP, ip_increment) {
      var ip = wholeIP.split('.');
      var last = parseInt(ip.pop()) + ip_increment;
      ip.push(last);
      return ip.join('.');
    }

    function nameHandler(wholeName, ip_increment) {
      var ip = wholeName.split('/')[0].split('.');
      var last = parseInt(ip.pop()) + ip_increment;
      ip.push(last);
      var end = wholeName.split('/')[1];

      if (last !== parseInt(last, 10)) {
        return wholeName;
      }

      if (!end) {
        return ip.join('.');
      }
      return ip.join('.')+'/'+end;
    }

    function incrementBulk() {
      var is_bulk = poolForm.ipv4.is_bulk;
      var increment_vlan = poolForm.ipv4.increment_vlan;
      var ip_increment = poolForm.input.ipv4.increment_amount;

      if (!is_bulk || !ip_increment) {
        return;
      }

      poolForm.input.ipv4.range_start = ipHandler(poolForm.input.ipv4.range_start, ip_increment)

      if (poolForm.ipv4.range_end) {
        poolForm.ipv4.range_end = (parseInt(poolForm.ipv4.range_end) + parseInt(ip_increment)).toString();
      }

      if (increment_vlan) {
        poolForm.input.vlan++;
        poolForm.input.ipv4.gateway = ipHandler(poolForm.input.ipv4.gateway, ip_increment)
      }
      poolForm.input.name = nameHandler(poolForm.input.name, ip_increment);
    }
  }
})();
