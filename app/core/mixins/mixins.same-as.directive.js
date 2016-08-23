(function () {
  'use strict';

  // http://stackoverflow.com/a/26319307/1190975
  angular
    .module('app.core.mixins')
    .directive('sameAs', function () {
      return {
        require: 'ngModel',
        link: link,
      };

      function link (scope, elem, attrs, ngModel) {
        ngModel.$parsers.unshift(validate);

        // Force-trigger the parsing pipeline.
        scope.$watch(attrs.sameAs, function () {
          validate(ngModel.$viewValue);
        });

        function validate(value) {
          var isValid = scope.$eval(attrs.sameAs) == value;

          ngModel.$setValidity('sameAs', isValid);

          return isValid ? value : undefined;
        }
      }
    });
})();
