(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .factory('WithSelected', WithSelectedFactory);

  /*ngInject*/
  function WithSelectedFactory(EventEmitter) {
    return function () {
      return new WithSelected(EventEmitter());
    };
  }

  function WithSelected(event) {
    var bulk = this;

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
        var promise = callback(bulk.selected());

        if (promise && promise.then instanceof Function) {
          return promise.then(fireApplyEvent);
        }

        fireApplyEvent();

        function fireApplyEvent() {
          event.fire('apply');
        }
      };
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
