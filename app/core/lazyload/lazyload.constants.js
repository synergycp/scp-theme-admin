(function () {
  'use strict';

  var BOWER = 'vendor/bower_components/';
  var NODE = 'vendor/node_modules/';

  angular
    .module('app.core.lazyload')
    .constant('APP_REQUIRES', {
      // jQuery based and standalone scripts
      scripts: {
        'modernizr': [BOWER+'modernizr/modernizr.custom.js'],
        'icons': [BOWER+'fontawesome/css/font-awesome.min.css'],
      },
      // Angular based script (use the right module name)
      modules: [
        // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
        {
          name: 'ui.map',
          files: [
            BOWER+'angular-ui-map/ui-map.js',
          ]
        }, {
          name: 'numeral',
          files: [
            BOWER+'numeral/min/numeral.min.js',
          ]
        }, {
          name: 'moment',
          files: [
            BOWER+'moment/moment.js',
          ]
        }, {
          name: 'date-range-picker',
          files: [
            BOWER+'bootstrap-daterangepicker/daterangepicker.js',
            BOWER+'bootstrap-daterangepicker/daterangepicker.css',
            BOWER+'angular-daterangepicker/js/angular-daterangepicker.js',
          ]
        }, {
          name: 'chart-js',
          files: [
            NODE+'chart.js/dist/Chart.min.js',
          ]
        }, {
          name: 'ng-chart-js',
          files: [
            NODE+'angular-chart.js/dist/angular-chart.min.js',
          ]
        },
      ],
    });

})();
