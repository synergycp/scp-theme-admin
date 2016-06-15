(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('provisionForm', {
      require: {
      },
      bindings: {
        input: '=',
      },
      controller: 'ProvisionFormCtrl as provisionForm',
      transclude: true,
      templateUrl: 'app/hardware/server/provision/provision.form.html',
    })
    .controller('ProvisionFormCtrl', ProvisionFormCtrl)
    ;

  /**
   * @ngInject
   */
  function ProvisionFormCtrl(Select, MultiInput, _, $stateParams, ServerConfig) {
    var provisionForm = this;

    provisionForm.$onInit = init;
    provisionForm.cpu = Select('part').filter({
      part_type: 'cpu',
    });
    provisionForm.mem = Select('part').filter({
      part_type: 'mem',
    });
    provisionForm.disks = MultiInput(DiskSelector).setMax(ServerConfig.MAX_DISKS).add();
    provisionForm.addOns = MultiInput(AddOnSelector).add();
    provisionForm.server = Select('server').filter({
      available: true,
    });
    provisionForm.profile = Select('pxe/profile').on('change', checkPxeProfileForIso);
    provisionForm.profile.hasIso = false;
    provisionForm.group = Select('group').on('change', function () {
      _.setContents(provisionForm.entities.selected, []);
      syncEntityFilter();
    });
    provisionForm.billing = {
      date: {
        value: null,
        isOpen: false,
      },
    };
    provisionForm.edition = null;
    provisionForm.client = Select('client');
    provisionForm.switchSpeed = Select('port-speed');
    provisionForm.entities = Select('entity').multi().filter({
      available: true,
    }).on('change', syncEntityToGroup);

    //////////

    function init() {
    }

    function checkPxeProfileForIso() {
      var iso = (provisionForm.profile.selected || {}).iso;
      provisionForm.profile.hasIso = !!iso;

      if (!provisionForm.profile.hasIso) {
        provisionForm.edition = null;
        return;
      }

      provisionForm.edition = Select('pxe/iso/'+iso.id+'/edition');
    }

    function syncEntityToGroup() {
      var entityGroup = (provisionForm.entities.selected[0] || {}).group || null;
      var entityGroupId = (entityGroup || {}).id || null;
      if (!entityGroup || provisionForm.group.getSelected('id') == entityGroupId) {
        syncEntityFilter();
        return;
      }

      var selectedEntities = _.clone(provisionForm.entities.selected);

      provisionForm.group.selected = entityGroup;
      provisionForm.group.fireChangeEvent();

      _.setContents(provisionForm.entities.selected, selectedEntities);
    }

    function syncEntityFilter() {
      provisionForm.entities
        .clearFilter('extra_for_id')
        .clearFilter('ip_group')
        .filter({
          extra_for_id: (provisionForm.entities.selected[0] || {}).id,
          ip_group: (provisionForm.group.selected || {}).id,
        })
        .load();
    }

    function getData() {
      var data = _.clone(provisionForm.input);

      data.disks = ids(provisionForm.disks);
      data.addons = ids(provisionForm.addOns);
      data.entities = _.map(provisionForm.entities.selected, 'id');
      data.switch.id = provisionForm.switch.getSelected('id');
      data.switch.speed = {
        id: provisionForm.switchSpeed.getSelected('id'),
      };
      data.group = {
        id: provisionForm.group.getSelected('id'),
      };
      data.client = {
        id: provisionForm.client.getSelected('id'),
      };
      data.billing.date = ""+provisionForm.billing.date.value;

      return data;
    }

    function ids(multi) {
      return _(multi.items)
        .map('selected.id')
        .filter()
        .value()
        ;
    }

    function DiskSelector(selected) {
      var select = Select('part').filter({
        part_type: 'disk',
      });
      select.selected = selected || null;
      select.load();

      return select;
    }

    function AddOnSelector(selected) {
      var select = Select('part').filter({
        part_type: 'add-on',
      });
      select.selected = selected || null;
      select.load();

      return select;
    }
  }
})();
