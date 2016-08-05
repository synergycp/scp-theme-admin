(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .factory('ListConfirm', ListConfirmFactory);

  /**
   * ListConfirm Factory
   *
   * @ngInject
   */
  function ListConfirmFactory($uibModal) {
    return function (list, lang) {
      return new ListConfirm(list, lang, $uibModal);
    };
  }

  function ListConfirm(list, lang, $uibModal) {
    var confirm = this;

    confirm.delete = remove;

    //////////

    function remove(items) {
      var modal = $uibModal.open({
        templateUrl: 'app/layout/list/list.confirm.delete.html',
        controller: 'ListConfirmDeleteCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          lang: function () {
            return lang;
          },
          items: function () {
            return items;
          },
        },
      });

      return modal.result.then(list.delete.bind(null, items));
    }
  }
})();
