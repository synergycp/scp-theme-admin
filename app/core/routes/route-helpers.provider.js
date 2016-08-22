/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.core.routes')
    .provider('RouteHelpers', RouteHelpersProvider);

  /**
   * @ngInject
   */
  function RouteHelpersProvider(APP_REQUIRES, ApiProvider, $stateProvider) {
    // provider access level
    var result = {
      basepath: basepath,
      resolveFor: resolveFor,
      dummyTemplate: '<ui-view />',
      package: makePackage,
    };

    // controller access level
    /**
     * @ngInject
     */
    result.$get = function ($sce) {
      var service = _.clone(result);
      service.trusted = trusted;
      service.package = wrappedPackage;

      return service;

      function trusted(path) {
        return $sce.trustAsResourceUrl(path);
      }

      function wrappedPackage() {
        var pkg = makePackage.apply(null, arguments);

        pkg.trustedAsset = trustedAsset;

        return pkg;

        function trustedAsset(path) {
          return trusted(pkg.asset(path));
        }
      }
    };

    return result;

    function makePackage(name) {
      return new Package(name);
    }

    // Set the base of the relative path for all app views
    function basepath(uri) {
      return 'app/' + uri;
    }

    function Package(name) {
      var pkg = this;
      var url = 'pkg/' + name + '/';

      pkg.asset = asset;
      pkg.lang = lang;
      pkg.state = state;
      pkg.raw = raw;

      function lang(language) {
        return 'lang:pkg:' + name + ':' + language;
      }

      function state(stateName, opts) {
        $stateProvider.state(stateName, opts);

        return pkg;
      }

      function asset(path) {
        return ApiProvider.baseUrl() + url + path;
      }

      function raw(path) {
        return 'raw:'+ asset(path);
      }
    }

    // Generates a resolve object by passing script names
    // previously configured in constant.APP_REQUIRES
    function resolveFor() {
      var _args = arguments;

      return {
        deps: resolveArgs,
      };

      /**
       * @ngInject
       */
      function resolveArgs(
        $q,
        $timeout,
        $injector,
        $translate,
        $ocLazyLoad,
        $translateModuleLoader
      ) {
        var lastPromise;

        return $q.all(
          _.map(_args, makePromise)
        );

        // creates promise to chain dynamically
        function makePromise(_arg) {
          var promise = $q.when(_arg);

          // also support a function that returns a promise
          if (typeof _arg === 'function') {
            return promise.then(_arg);
          }

          lastPromise = promise.then(loadArg.bind(null, _arg, lastPromise));

          return lastPromise;
        }

        function loadArg(_arg, lastPromise) {
          var split = _arg.split(':');
          var type = split.shift();
          var load = split.join(':');

          switch (type) {
          case 'lang':
            $translateModuleLoader.addPart(load);

            return $translate.refresh();
          case 'inject':
            return $injector.get(load);
          case 'raw':
            return $ocLazyLoad.load(load);
          case 'after':
            return lastPromise.then(function() {
              return loadArg(load);
            });
          }

          // if is a module, pass the name. If not, pass the array
          var whatToLoad = getRequired(_arg);

          // simple error check
          if (!whatToLoad) {
            return $.error(
              'Route resolve: Bad resource name [' + _arg + ']'
            );
          }

          // finally, return a promise
          return $ocLazyLoad.load(whatToLoad);
        }

        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (APP_REQUIRES.modules) {
            for (var m in APP_REQUIRES.modules) {
              if (APP_REQUIRES.modules[m].name &&
                  APP_REQUIRES.modules[m].name === name
              ) {
                return APP_REQUIRES.modules[m];
              }
            }
          }

          return APP_REQUIRES.scripts &&
                 APP_REQUIRES.scripts[name];
        }
      }
    }
  }
})();
