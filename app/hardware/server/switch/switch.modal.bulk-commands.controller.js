(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('ServerSwitchModalBulkCommandsCtrl', ServerSwitchModalBulkCommandsCtrl);

  /**
   * @ngInject
   */
  function ServerSwitchModalBulkCommandsCtrl(items, Loader, $q, Api, $timeout, _) {
    var modal = this;
    modal.lang = 'server.switch.modal.bulk-commands';
    modal.data = {
      submitClass: 'btn-primary'
    };
    modal.submit = submit;
    modal.targets = items;
    modal.loader = Loader();

    var CHECKLIST_ITEMS = [
      {
        command: 'sync-vlan',
        translate: "server.switch.SYNC_VLAN",
      },
      {
        command: 'sync-speed',
        translate: "server.switch.SYNC_SPEED",
      },
      {
        command: 'power-on',
        translate: "server.switch.power.on.BTN",
      },
      {
        command: 'power-off',
        translate: "server.switch.power.off.BTN",
      },
    ];

    modal.checklistItems = _.clone(CHECKLIST_ITEMS);

    var queue = new ConcurrentlyLimitedQueue({max: 10, throttle: 25});

    /////////

    function submit() {
      return modal.loader.during(
        $q.all(
          _.map(modal.targets, function (server) {
            return queue.push(function () {
              return Api.all('server')
                .one(''+server.id)
                .all('port')
                .getList()
            }).then(runSwitchCommandsOnPort);
          })
        ).then(modal.$close)
      );

      function runSwitchCommandsOnPort(ports) {
        return $q.all(
          _.map(ports, function (port) {
            return $q.all(
              _.map(modal.checklistItems, function (checklistItem) {
                if (!checklistItem.selected) {
                  return;
                }

                return queue.push(function () {
                  return port.all('command').post({
                    'command': checklistItem.command,
                  });
                });
              })
            );
          })
        );
      }
    }

    // TODO: full factory for this in core
    function ConcurrentlyLimitedQueue(options) {
      var queue = this;
      var ongoing = 0;
      var pending = [];
      options.max = options.max || 10;
      options.throttle = options.throttle || 10;
      var dequeue = _.throttle(unthrottledDequeue, options.throttle);

      queue.push = push;

      function push(callback) {
        var defer = $q.defer();
        pending.unshift({
          callback: callback,
          defer: defer,
        });
        dequeue();

        return defer.promise;
      }

      function unthrottledDequeue() {
        if (options.max <= ongoing) {
          return;
        }

        var queuedItem = pending.pop();

        if (!queuedItem) {
          // All done!
          // The dequeueing process will start again when we're given something else to do.
          return;
        }

        ongoing++;
        queuedItem.callback().then(handleComplete, handleFail);

        function handleComplete(result) {
          ongoing--;
          dequeue();
          queuedItem.defer.resolve(result);
          return result;
        }

        function handleFail(result) {
          ongoing--;
          dequeue();
          queuedItem.defer.reject(result);
          return $q.reject(result);
        }

        setTimeout(dequeue, options.throttle+1);
      }
    }
  }
})();
