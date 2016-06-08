(function () {
  'use strict';

  var INPUTS = {
    name: '',
    description: '',
    body: '',
    is_installable: false,
  };

  angular
    .module('app.network')
    .component('groupForm', {
      require: {
      },
      bindings: {
        input: '=',
      },
      controller: 'GroupFormCtrl as groupForm',
      transclude: true,
      templateUrl: 'app/network/group/group.form.html'
    })
    .controller('GroupFormCtrl', GroupFormCtrl)
    ;

  function GroupFormCtrl() {
    var groupForm = this;

    groupForm.$onInit = init;

    //////////

    function init() {
      _.assign(groupForm.input, INPUTS);
    }
  }
})();
