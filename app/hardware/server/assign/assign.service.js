(function () {
  'use strict';

  var DIR = 'app/hardware/server/assign';

  angular
    .module('app.hardware.server')
    .service('ServerAssign', ServerAssignService)
    ;

  /**
   * ServerAssign Service
   *
   * @ngInject
   */
  function ServerAssignService ($q, $uibModal, List, ServerAssignModal) {
    var ServerAssign = this;
    var list = List('server');

    ServerAssign.unsuspend = unsuspend;
    ServerAssign.client = ServerAssignModal.client;
    ServerAssign.suspend = ServerAssignModal.suspend;
    ServerAssign.billing = {
      limits: billingLimits,
      date: billingDate,
    };

    //////////

    function billingLimits(items) {
      var modal = $uibModal.open({
        templateUrl: DIR+'/billing/billing.limits.modal.html',
        controller: 'ServerAssignBillingLimitModalCtrl',
        controllerAs: 'modal',
        bindToController: true,
        resolve: {
          items: _.return(items),
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
        templateUrl: DIR+'/billing/billing.date.modal.html',
        controller: 'ServerAssignBillingDateModalCtrl',
        controllerAs: 'modal',
        bindToController: true,
        resolve: {
          items: _.return(items),
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

      return server
        .one('access/'+access.id)
        .patch(data)
        .then(saveResponse)
        ;

      function saveResponse(response) {
        _.assign(access, response);
      }
    }
  }
})();
