(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .factory('WithSelected', WithSelectedFactory);

  /*ngInject*/
  function WithSelectedFactory(EventEmitter, Alert) {
    return function () {
      return new WithSelected(EventEmitter(), Alert);
    };
  }

  function WithSelected(event, Alert) {
    var bulk = this;

    bulk.hasOptions = false;
    bulk.options = {};
    bulk.items = [];
    bulk.add = add;
    bulk.selectedResolver = setSelectedResolver;
    bulk.selected = selected;
    bulk._selectedResolver = null;

    event.bindTo(bulk);

    ////////////////

    function add(name, callback) {
      bulk.options[name] = function () {
        var items = bulk.selected();

        if (!items.length) {
          return Alert.warning('Please select at least one item.');
        }

        var promise = callback(items);

        if (promise && promise.then instanceof Function) {
          return promise.then(fireApplyEvent);
        }

        fireApplyEvent();

        function fireApplyEvent() {
          event.fire('apply');
        }
      };
      bulk.hasOptions = true;
    }

    function setSelectedResolver(resolver) {
      bulk._selectedResolver = resolver;
    }

    function selected() {
      if (!bulk._selectedResolver) {
        return null;
      }

      return bulk._selectedResolver();
    }
  }

})();
