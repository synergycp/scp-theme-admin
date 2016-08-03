(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .service('ServerAssign', ServerAssignService);

  /**
   * ServerAssign Service
   *
   * @ngInject
   */
  function ServerAssignService ($q, $uibModal, List, ServerAssignModal) {
    var ServerAssign = this;
    var list = List('server');

    ServerAssign.unsuspend = unsuspend;
    ServerAssign.switch = switchModal;
    ServerAssign.group = group;
    ServerAssign.client = ServerAssignModal.client;
    ServerAssign.suspend = ServerAssignModal.suspend;
    ServerAssign.billing = {
      limits: billingLimits,
      date: billingDate,
    };

    //////////

    function billingLimits(items) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/assign.billing.limits.modal.html',
        controller: 'ServerAssignBillingLimitModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          items: function () {
            return items;
          },
        },
      });

      return modal.result.then(function (input) {
        return list.patch({
          billing: {
            max_bandwidth: input.limit,
          },
        }, items);
      });
    }

    function billingDate(items) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/assign.billing.date.modal.html',
        controller: 'ServerAssignBillingDateModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          items: function () {
            return items;
          },
        },
      });

      return modal.result.then(function (input) {
        return list.patch({
          billing: {
            date: input.date,
          },
        }, items);
      });
    }

    function switchModal(items) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/assign.switch.modal.html',
        controller: 'ServerAssignSwitchModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          items: function () {
            return items;
          },
        },
      });

      return modal.result.then(function (selected) {
        return list.patch({
          switch: !selected ? null : {
            id: selected.id,
          },
        }, items);
      });
    }

    function group(items) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/assign.group.modal.html',
        controller: 'ServerAssignGroupModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          items: function () {
            return items;
          },
        },
      });

      return modal.result.then(function (group) {
        return list.patch({
          group: group ? group.id : null,
        }, items);
      });
    }

    function unsuspend(servers) {
      return $q.all(
        _.map(servers, setActive.bind(null, true))
      );
    }

    function setActive(active, server) {
      var access = server.access;

      if (!access) {
        return;
      }

      var data = {
        is_active: active,
      };

      return server.one('access/'+access.id)
        .patch(data)
        .then(saveResponse)
        ;

      function saveResponse(response) {
        _.assign(access, response);
      }
    }
  }
})();
