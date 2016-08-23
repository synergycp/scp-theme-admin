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
    groupForm.input = _.clone(INPUTS);

    //////////

    function init() {
      fillFormInputs();

      groupForm.form.getData = getData;
      (groupForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(groupForm.input);
    }

    function fillFormInputs() {
      _.overwrite(groupForm.input, groupForm.form.input);
    }
  }
})();
