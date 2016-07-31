(function () {
  'use strict';

  angular
    .module('app.user.client')
    .service('Client', ClientService);

  /**
   * Client Service
   *
   * @ngInject
   */
  function ClientService (Api, $httpParamSerializer) {
    var Client = this;
    var $sso = Api.all('sso');
    var $key = Api.all('key');

    Client.loginAs = loginAs;
    Client.makeApiKey = makeApiKey;

    //////////

    function makeApiKey(clientId) {
      return $key.post({
        owner_id: clientId,
        owner_type: 'client',
      });
    }

    function loginAs(clientId, options) {
      return makeApiKey(clientId)
        .then(sso)
        ;

      function sso(apiKey) {
        var queryData = _.assign({
          key: apiKey.key,
        }, options || {});
        var url = $sso.getRestangularUrl(
          '?'+$httpParamSerializer(queryData)
        );

        window.open(url, '_blank');
      }
    }
  }
})();
