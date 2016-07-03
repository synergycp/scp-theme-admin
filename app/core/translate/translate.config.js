(function() {
    'use strict';

    angular
        .module('app.core.translate')
        .config(translateConfig)
        ;

    /**
     * @ngInject
     */
    function translateConfig($translateProvider, ApiProvider) {
      $translateProvider.useLoader('$translateModuleLoader', {
        urlTemplate: urlTemplate,
        prefix: prefix,
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('escape');

      function urlTemplate(name, lang) {
        var split = name.split(':');
        if (split.shift() == 'pkg' && split.length) {
          var url = ApiProvider.baseUrl();
          return url+'pkg/'+split.shift()+
            '/assets/lang/'+lang+
            '/'+split.join(':')+'.json';
        }
        return 'assets/lang/'+lang+'/'+name+'.json';
      }

      function prefix(name) {
        var split = name.split(':');
        if (split.shift() == 'pkg' && split.length) {
          return 'pkg.'+split.join('.');
        }

        return name;
      }

    }
})();
