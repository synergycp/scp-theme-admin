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
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

      function urlTemplate(name, lang) {
        var split = name.split(':', 3);
        if (split.shift() == 'pkg' && split.length) {
          var url = ApiProvider.baseUrl();
          return url+'pkg/'+split.shift()+
            '/assets/lang/'+lang+
            '/'+split.join(':')+'.json';
        }
        return 'assets/lang/'+lang+'/'+name+'.json';
      }

    }
})();
