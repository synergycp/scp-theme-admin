(function () {
  'use strict';

  angular
    .module('app.system.setting')
    .service('SettingLang', SettingLangService)
  ;

  /**
   * @ngInject
   */
  function SettingLangService(RouteHelpers, $q) {
    var SettingLang = this;

    SettingLang.load = load;

    function load(groups) {
      var promises = [
        RouteHelpers.loadLang('settings'),
      ];

      _.map(groups, function(group) {
        if(group.settings[0].pkg) {
          promises.push(
            RouteHelpers.loadLang('pkg:'+group.settings[0].pkg+':admin:settings')
          );
        }
      })

      return $q.all(promises);
    }
  }
})();
