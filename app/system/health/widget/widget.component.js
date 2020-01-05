(function () {
  'use strict';

  var STATE = {
    LOADING: 'LOADING',
    OK: 'OK',
    WARN: 'WARN',
    ERROR: 'ERROR',
  };

  var STATES_BY_URGENCY = [
    STATE.LOADING,
    STATE.OK,
    STATE.WARN,
    STATE.ERROR,
  ];

  angular
    .module('app.system.health.widget')
    .component('systemHealthWidget', {
      require: {},
      bindings: {},
      controller: 'SystemHealthWidgetCtrl as widget',
      transclude: true,
      templateUrl: 'app/system/health/widget/widget.html'
    })
    .controller('SystemHealthWidgetCtrl', SystemHealthWidgetCtrl)
  ;

  /**
   * @ngInject
   */
  function SystemHealthWidgetCtrl(_, $q, Loader, RouteHelpers, Api, HealthStatusRenderer, $injector,
    SimpleHealthStatusRenderer) {
    var widget = this;

    widget.status = _.assign({
      current: STATE.LOADING,
    }, STATE);
    widget.checks = [];
    widget.handleClick = handleClick;
    widget.statusToTextClass = statusToTextClass;
    widget.statusToAlertClass = statusToAlertClass;
    widget.refresh = refresh;
    widget.loader = Loader();
    widget.$onInit = init;

    //////////

    function handleClick(check) {
      var potentialPromise = check.onClick();
      if (typeof _.get(potentialPromise, 'then') === 'function') {
        return widget.loader.during(potentialPromise.then(refresh));
      }
    }

    function setMinState(status) {
      if (STATES_BY_URGENCY.indexOf(widget.status.current) < STATES_BY_URGENCY.indexOf(status)) {
        widget.status.current = status;
      }
    }

    function refresh() {
      widget.status.current = widget.status.LOADING;
      return load();
    }

    function init() {
      RouteHelpers.loadLang('health');
      load();
    }

    function load() {
      return widget.loader.during(
        loadHealth()
          .then(storeHealth)
      );
    }

    function loadHealth() {
      return Api.all('system/health')
        .getList();
    }

    function storeHealth(healthChecks) {
      if (healthChecks.length === 0) {
        setMinState(STATE.WARN);
        return;
      }

      return $q.all(
        _.map(healthChecks, function (healthCheck) {
          setMinState(healthCheck.status);
          return renderHealthCheck(healthCheck);
        })
        )
        .then(function (checks) {
          _.setContents(widget.checks, _.filter(checks));
        });
    }

    function statusToTextClass(status) {
      switch (status) {
        case STATE.OK:
          return 'text-success';
        case STATE.WARN:
          return 'text-warning';
        case STATE.ERROR:
          return 'text-danger';
        case undefined:
        case STATE.LOADING:
          return '';
        default:
          console.error('unimplemented status: ' + status);
      }
    }

    function statusToAlertClass(status) {
      switch (status) {
        case STATE.OK:
          return 'alert-success';
        case STATE.WARN:
          return 'alert-warning';
        case STATE.ERROR:
          return 'alert-danger';
        case undefined:
        case STATE.LOADING:
          return '';
        default:
          console.error('unimplemented status: ' + status);
      }
    }

    function renderHealthCheck(healthCheck) {
      // TODO: would be nice to have a way to detect that all packages had been loaded so we don't need this janky
      // timeout check.
      return HealthStatusRenderer
        .getWithTimeout(healthCheck.slug, 5000)
        .catch(handleGetRendererError)
        .then(renderHealthCheckRenderer)
        .catch(handleRenderRendererError)
        .then(function (renderedCheck) {
          renderedCheck.status = renderedCheck.status || healthCheck.status;
          return renderedCheck;
        });

      function renderHealthCheckRenderer(RendererClass) {
        return $injector.instantiate(RendererClass, {'healthCheck': healthCheck})
          .render();
      }

      function handleGetRendererError(error) {
        console.error('Error getting HealthStatusRenderer: ' + healthCheck.slug);
        console.error(error);
        return SimpleHealthStatusRenderer(function () {
          alert('Couldn\'t find HealthStatusRenderer: ' + healthCheck.slug);
        }, function () {
          return 'health.check.missing_renderer.ERROR';
        });
      }

      function handleRenderRendererError(error) {
        console.error('Error rendering HealthStatusRenderer: ' + healthCheck.slug);
        console.error(error);
        return renderHealthCheckRenderer(SimpleHealthStatusRenderer(function () {
          alert('Couldn\'t render HealthStatusRenderer: ' + healthCheck.slug);
        }, function () {
          return 'health.check.error_in_render.ERROR';
        }));
      }
    }
  }
})();
