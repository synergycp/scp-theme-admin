(function () {
  'use strict';

  angular
    .module('app.system.version.widget')
    .component('systemVersionWidget', {
      require: {},
      bindings: {},
      controller: 'SystemVersionWidgetCtrl as widget',
      templateUrl: 'app/system/version/widget/widget.html'
    })
    .controller('SystemVersionWidgetCtrl', SystemVersionWidgetCtrl);

  /**
   * @ngInject
   */
  function SystemVersionWidgetCtrl(
    RouteHelpers,
    EventEmitter,
    Loader,
    VersionService,
    $q,
    Modal,
    _
  ) {
    var widget = this;
    widget.current = {};
    widget.latest = {
      viewDetails: viewLatestDetails,
    };
    widget.refresh = onRefresh;
    widget.loader = Loader();
    widget.isNewVersionAvailable = isNewVersionAvailable;

    EventEmitter().bindTo(widget);

    widget.$onInit = init;

    //////////

    function init() {
      load();
      RouteHelpers.loadLang('version');
      VersionService.onChange(load);
    }

    function viewLatestDetails() {
      return widget.loader.during(
        Modal
          .information('version.modal.details')
          .templateUrl('app/system/version/modal/modal.version.details.html')
          .data({
            version: widget.latest,
          })
          .open()
          .result
      );
    }

    function onRefresh() {
      return widget.loader.during(
        VersionService.refresh()
      );
    }

    function load() {
      return widget.loader.during($q.all([
        VersionService.getCurrent().then(storeCurrent),
        VersionService.getLatest().then(storeLatest),
      ]));
    }

    function storeCurrent(version) {
      _.assign(widget.current, version);
    }

    function storeLatest(version) {
      _.assign(widget.latest, version);
    }

    function isNewVersionAvailable() {
      var latest = _.get(widget, 'latest.semver');
      var current = _.get(widget, 'current.semver')
      return latest && current && SemVer.gt(latest,  current);
    }
  }
})();
