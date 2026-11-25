(function () {
  'use strict';

  angular
    .module('app.user.admin')
    .component('adminNotifications', {
      bindings: {
        adminId: '<',
      },
      controller: 'AdminNotificationsCtrl as notifications',
      templateUrl: 'app/user/admin/notifications/notifications.html',
    })
    .controller('AdminNotificationsCtrl', AdminNotificationsCtrl)
    ;

  /**
   * [BA-296] Which notification emails an administrator receives. Each
   * checkbox saves as soon as it is changed.
   *
   * @ngInject
   */
  function AdminNotificationsCtrl(Api, Loader) {
    var notifications = this;

    notifications.loader = Loader();
    notifications.items = [];
    notifications.loaded = false;
    notifications.save = save;
    notifications.$onInit = init;

    //////////

    function api() {
      return Api.one('admin/' + notifications.adminId + '/notification');
    }

    function init() {
      return notifications.loader.during(
        api()
          .get()
          .then(store)
      );
    }

    function save(item) {
      return notifications.loader.during(
        api()
          .patch({
            notifications: [{
              key: item.key,
              enabled: !!item.enabled,
            }],
          })
          .then(store, function () {
            // Not saved: show what is stored again.
            item.enabled = !item.enabled;
          })
      );
    }

    function store(response) {
      notifications.items = _.map(
        (response && response.notifications) || [],
        function (item) {
          return _.pick(item, ['key', 'name', 'description', 'enabled']);
        }
      );
      notifications.loaded = true;
    }
  }
})();
