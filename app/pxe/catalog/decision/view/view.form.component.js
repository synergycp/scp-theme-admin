(function () {
  'use strict';

  var INPUTS = {
    id: 0,
    name: '',
    current_body: 'Loading ...',
    body_snapshot: 'Loading ...',
  };

  angular
    .module('app.pxe.catalog.decision.view')
    .component('catalogDecisionForm', {
      require: {},
      bindings: {
        form: '=',
      },
      controller: 'CatalogDecisionFormCtrl as catalogDecisionForm',
      transclude: true,
      templateUrl: 'app/pxe/catalog/decision/view/view.form.html',
    })
    .controller('CatalogDecisionFormCtrl', CatalogDecisionFormCtrl);

  /**
   * @ngInject
   */
  function CatalogDecisionFormCtrl($state, Api, Alert) {
    var catalogDecisionForm = this;

    catalogDecisionForm.$onInit = init;
    catalogDecisionForm.input = _.clone(INPUTS);
    catalogDecisionForm.restore = doRestore;
    catalogDecisionForm.ourFiles = { file: 'Loading...' };
    catalogDecisionForm.theirFiles = { file: 'Loading...' };
    catalogDecisionForm.mergelySettings = {
      height: 'auto',
      license: 'lgpl-separate-notice',
      lhs_cmsettings: { readOnly: true },
      rhs_cmsettings: { readOnly: true },
    };

    //////////

    function doRestore() {
      return Api
        .all('pxe/catalog/decision/' + catalogDecisionForm.input.id + '/restore')
        .post()
        .then(function () {
          Alert.success('Template decision restored. Catalog will re-sync.');
          transferToList();
        })
        .catch(function () {
          Alert.danger('Failed to restore decision.');
        });
    }

    function transferToList() {
      $state.go('app.pxe.catalog.decision.list');
    }

    function init() {
      fillFormInputs();

      (catalogDecisionForm.form.on || function () {})(
        ['change', 'load'],
        fillFormInputs
      );
    }

    function fillFormInputs() {
      _.overwrite(catalogDecisionForm.input, catalogDecisionForm.form.input);
      catalogDecisionForm.ourFiles = {
        file: catalogDecisionForm.input.current_body || '(target deleted)',
      };
      catalogDecisionForm.theirFiles = {
        file: catalogDecisionForm.input.body_snapshot || '',
      };
    }
  }
})();
