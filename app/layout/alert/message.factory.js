(function () {
  'use strict';

  angular
    .module('app.layout.alert')
    .factory('Message', MessageFactory);

  /**
   * Message Factory
   *
   * @ngInject
   */
  function MessageFactory (EventEmitter) {
    var defaults = {
      timeout: 7000,
    };

    return function (type, text) {
        return new Message(type, text, defaults, EventEmitter());
    };
  }

  function Message (type, text, defaults, event) {
    var message = this;
    var timeout;

    message.text = text;
    message.type = type || 'info';
    message.timeout = defaults.timeout;

    message.setTimeout = doSetTimeout;
    message.remove = remove;

    event.bindTo(message);

    activate();

    //////////

    function activate() {
      doSetTimeout(message.timeout);
    }

    function doSetTimeout(milliseconds) {
      message.timeout = milliseconds;

      if (timeout) {
        clearTimeout(timeout);

        timeout = null;
      }

      if (message.timeout) {
        timeout = setTimeout(message.remove, message.timeout);
      }
    }

    function remove() {
      event.fire('remove', message);
    }
  }
})();
