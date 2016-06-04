(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .controller('WithSelectedCtrl', WithSelectedCtrl)
    ;

  /**
   * WithSelected Controller
   *
   * @ngInject
   */
  function WithSelectedCtrl(Alert) {
    var bulk = this;

    bulk.selected = null;
    bulk.submit = submit;

    activate();

    //////////

    function activate() {

    }

    function submit() {
      if (!bulk.selected) {
        return Alert.warning('Please select a bulk action');
      }

      if (bulk.onSubmit) {
        bulk.onSubmit(bulk.selected);
      }

      bulk.options[bulk.selected]();
    }
  }
})();
