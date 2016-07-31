(function() {
    'use strict';

    angular
        .module('app.core.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':  ['vendor/modernizr/modernizr.custom.js'],
            'icons':      ['vendor/fontawesome/css/font-awesome.min.css'],
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
            {name: 'ui.map', files: [
              'vendor/angular-ui-map/ui-map.js',
            ]},
            {name: 'numeral', files: [
              'vendor/numeral/min/numeral.min.js',
            ]},
            {name: 'moment', files: [
              'vendor/moment/moment.js',
            ]},
            {name: 'date-range-picker', files: [
              'vendor/bootstrap-daterangepicker/daterangepicker.js',
              'vendor/angular-daterangepicker/js/angular-daterangepicker.js',
              'vendor/bootstrap-daterangepicker/daterangepicker.css',
            ]},
            {name: 'chart-js', files: [
              'vendor/Chart.js/dist/Chart.min.js',
            ]},
            {name: 'ng-chart-js', files: [
              'vendor/angular-chart.js/dist/angular-chart.min.js',
            ]},
          ],
        })
        ;

})();
