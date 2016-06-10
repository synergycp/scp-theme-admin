(function () {
  'use strict';

  var INPUTS = {
    name: '',
    billing_id: '',
    reserved: false,
  };

  angular
    .module('app.network')
    .component('groupForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'GroupFormCtrl as groupForm',
      transclude: true,
      templateUrl: 'app/network/group/group.form.html'
    })
    .controller('GroupFormCtrl', GroupFormCtrl)
    ;

  /**
   * @ngInject
   */
  function GroupFormCtrl() {
    var groupForm = this;

    groupForm.$onInit = init;

    //////////

    function init() {
      groupForm.form.getData = getData;
      groupForm.input = groupForm.form.input = groupForm.form.input || {};
      _.assign(groupForm.input, INPUTS);
    }

    function getData() {
      return _.clone(groupForm.input);
    }
  }
})();
