angular
  .module('app.network.forward.gateway')
  .controller('ForwardGatewayVersionUpdateCtrl', ForwardGatewayVersionUpdateCtrl);

/**
 * @ngInject
 * @constructor
 */
function ForwardGatewayVersionUpdateCtrl(Loader, _, data) {
  var modal = this;
  modal.loader = Loader();
  modal.submit = onSubmit;
  modal.data = (data || {});
  modal.api_key = '';
  _.assign(modal.data, {
    submitClass: 'btn-primary',
  });

  modal.$onInit = init;

  function init() {}

  function onSubmit() {
    return modal.loader.during(
      modal.data.gateway.patch({
        api_key: modal.api_key,
        resync: true,
        refresh_health: true,
      }).then(function (gateway) {
        _.assign(modal.data.gateway, gateway);
      }).then(modal.$close)
    );
  }
}
