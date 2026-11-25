(function () {
  'use strict';

  var TEMPLATE = 'app/system/license/banner/banner.html';

  angular
    .module('app.system.license.banner')
    .component('systemLicenseBanner', {
      require: {},
      bindings: {},
      controller: 'SystemLicenseBannerCtrl as banner',
      template:
        '<div class="alert alert-warning m0 no-rounding" ' +
          'ng-if="banner.state" ng-class="banner.loader.class">' +
          '<i class="fa fa-exclamation-triangle"></i> ' +
          '<span translate="license.banner.{{ banner.state }}" ' +
            'translate-value-date="{{ banner.stopsAt | date:\'medium\' }}"></span> ' +
          '<a class="btn btn-xs btn-default" href="https://billing.synergycp.com/" ' +
            'target="_blank" rel="noopener" ng-if="banner.state === \'OVERDUE\'" ' +
            'translate="license.banner.PAY"></a> ' +
          '<a class="btn btn-xs btn-default" ng-click="banner.refresh()" ' +
            'translate="license.banner.REFRESH"></a>' +
        '</div>',
    })
    .controller('SystemLicenseBannerCtrl', SystemLicenseBannerCtrl)
    .run(registerLicenseBanner);

  /**
   * [BA-100] Show the banner above every page of the admin panel. The app
   * shell (scp-angle core/app) renders each template listed in
   * $rootScope.banners.
   *
   * @ngInject
   */
  function registerLicenseBanner($rootScope, $templateCache) {
    $templateCache.put(TEMPLATE, '<system-license-banner></system-license-banner>');
    $rootScope.banners = ($rootScope.banners || []).concat([TEMPLATE]);
  }

  /**
   * Warns when the SynergyCP license renewal is overdue: the panel keeps
   * working for a few days after the due date and then stops, and nothing
   * else says so until it does.
   *
   * @ngInject
   */
  function SystemLicenseBannerCtrl(RouteHelpers, Loader, LicenseService) {
    var banner = this;

    // OVERDUE, GRACE or null (nothing to show).
    banner.state = null;
    banner.stopsAt = null;
    banner.loader = Loader();
    banner.refresh = refresh;
    banner.$onInit = init;

    //////////

    function init() {
      RouteHelpers.loadLang('license');
      LicenseService.onChange(show);

      LicenseService
        .getLicense()
        .then(function (license) {
          // The stored due date can be behind a payment made since the last
          // scheduled check: ask the license service before warning anyone.
          if (license.isOverdue) {
            return LicenseService.refresh();
          }
        })
        .catch(angular.noop)
        .then(show);
    }

    function refresh() {
      return banner.loader.during(
        LicenseService.refresh().catch(angular.noop)
      );
    }

    function show() {
      LicenseService.getLicense().then(function (license) {
        // No stop date means it has already stopped: the API then refuses
        // every request and the License Expired page takes over.
        if (!license.isOverdue || !license.stopsAt) {
          banner.state = null;
          return;
        }

        banner.stopsAt = license.stopsAt;
        banner.state = license.isInGracePeriod ? 'GRACE' : 'OVERDUE';
      }).catch(angular.noop);
    }
  }
})();
