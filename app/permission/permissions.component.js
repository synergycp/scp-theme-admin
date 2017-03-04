(function () {
  'use strict';

  angular
    .module('app.permission')
    .component('permissions', {
      bindings: {
        map: '='
      },
      controller: 'PermissionsCtrl as perms',
      templateUrl: 'app/permission/permissions.html'
    })
    .controller('PermissionsCtrl', PermissionsCtrl)
  ;

  /**
   * @ngInject
   * @constructor
   */
  function PermissionsCtrl() {
    var perms = this;

    perms.allSelected = false;
    perms.toggleAllCheckboxes = toggleAllCheckboxes;
    perms.areAllSelected = areAllSelected;

    //////

    // toggle all checkboxes value
    function toggleAllCheckboxes() {
      setVal(perms.map, perms.allSelected);
      function setVal(obj, valueToSet) {
        _.forEach(obj, function (value, key) {
          _.isObject(value) ? setVal(value, valueToSet) : (obj[key] = valueToSet)
        });
      }
    }

    // set allSelected=true if all checkboxes are selected, and false if at least one is not
    function areAllSelected() {
      var val = true;
      perms.allSelected = checkVal(perms.map);
      function checkVal(obj) {
        _.forEach(obj, function (value, key) {
          return val = _.isObject(value) ? checkVal(value) : obj[key]
        });
        return val;
      }
    }
  }
})();
