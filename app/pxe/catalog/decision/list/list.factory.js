(function () {
  'use strict';

  var API = 'pxe/catalog/decision';

  angular
    .module('app.pxe.catalog.decision.list')
    .factory('CatalogDecisionList', CatalogDecisionListFactory);

  /**
   * CatalogDecisionList Factory
   *
   * @ngInject
   */
  function CatalogDecisionListFactory(List, Api, Alert) {
    return function () {
      var list = List(API);

      list.params = list.params || {};
      list.params.decision = 'discarded';

      list.restore = function (item) {
        return Api
          .all(API + '/' + item.id + '/restore').post()
          .then(function () {
            Alert.success('Template decision restored. Catalog will re-sync.');
            list.refresh.now();
          })
          .catch(function () {
            Alert.danger('Failed to restore decision.');
          });
      };

      list.updateCatalog = function () {
        return Api
          .all('pxe/catalog/sync').post()
          .then(function () {
            Alert.success('Catalog update started. New suggestions will appear shortly.');
          })
          .catch(function () {
            Alert.danger('Failed to start catalog update.');
          });
      };

      return list;
    };
  }
})();
