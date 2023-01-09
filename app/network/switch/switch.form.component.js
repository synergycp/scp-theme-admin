(function () {
  "use strict";

  var SNMP_VERSION = {
    V2c: 0,
    V1: 1,
  };

  var MULTI_VLAN_LOGIC = {
    SINGLE: "SINGLE",
    TAGGING: "TAGGING",
    COMBINE: "COMBINE",
  };

  var LAYER = {
    RACK: "RACK",
    DISTRIBUTION: "DISTRIBUTION",
  };

  var FUNCTION = {
    LAYER_2: "LAYER_2",
    LAYER_3: "LAYER_3",
  };

  var INPUTS = {
    admin_notes: "",
    name: "",
    type: 0,
    ip: "",
    port: "",
    ssh_user: "",
    ssh_pass: "",
    ssh_en_pass: "",
    ssh_en_type: 0,
    snmp_pass: "",
    multi_vlan_logic: MULTI_VLAN_LOGIC.SINGLE,
    snmp_use_32_bit: false,
    snmp_version: SNMP_VERSION.V2c,
    layer: LAYER.RACK,
    function: FUNCTION.LAYER_2,
    ipv4_address: "",
    ipv6_address: "",
    use_ssh_ip: false,
  };

  angular
    .module("app.hardware")
    .component("switchForm", {
      require: {},
      bindings: {
        form: "=",
      },
      controller: "SwitchFormCtrl as switchForm",
      transclude: true,
      templateUrl: "app/network/switch/switch.form.html",
    })
    .controller("SwitchFormCtrl", SwitchFormCtrl);

  /**
   * @ngInject
   */
  function SwitchFormCtrl(Todo, Select, _, Api, Modal) {
    var switchForm = this;

    switchForm.switchTypes = [];
    switchForm.input = _.clone(INPUTS);
    switchForm.groups = Select("group").multi();
    switchForm.uplinks = Select("switch").multi();
    switchForm.SNMP_VERSION = SNMP_VERSION;
    switchForm.MULTI_VLAN_LOGIC = MULTI_VLAN_LOGIC;
    switchForm.LAYER = LAYER;
    switchForm.function = FUNCTION;
    switchForm.uplinksOriginal = [];
    switchForm.layer3 = false;
    switchForm.openMultiVLANLogicLearnMoreModal =
      openMultiVLANLogicLearnMoreModal;

    switchForm.$onInit = init;

    //////////

    function init() {
      Api.all("switch/type")
        .getList()
        .then(function (result) {
          _.setContents(switchForm.switchTypes, result);
          switchForm.input.type =
            switchForm.input.type || switchForm.switchTypes[0].slug;
        });

      fillFormInputs();
      switchForm.form.getData = getData;
      if (switchForm.form.on) {
        switchForm.form.on(["change", "load"], function (response) {
          fillFormInputs();

          _.setContents(switchForm.groups.selected, response.groups);
        });
        switchForm.form.on(["load", "change:all-complete"], loadUplinks);
        switchForm.form.on(["create"], Todo.refresh);
      }
    }

    function openMultiVLANLogicLearnMoreModal() {
      return Modal.information(
        "switch.form.options.multi_vlan_logic.learn_more_modal"
      )
        .data({
          options: MULTI_VLAN_LOGIC,
        })
        .templateUrl(
          "app/network/switch/switch.form.multiVlanLogic.learnMoreModal.html"
        )
        .open().result;
    }

    function fillFormInputs() {
      _.overwrite(switchForm.input, switchForm.form.input);
      switchForm.layer3 = switchForm.input.function === FUNCTION.LAYER_3;
    }

    function loadUplinks() {
      return Api.all("switch/" + switchForm.form.input.id + "/uplink")
        .getList()
        .then(storeUplinks);
    }

    function storeUplinks(response) {
      _.setContents(
        switchForm.uplinks.selected,
        _.map(response, function (uplink) {
          return uplink.parent;
        })
      );
      _.setContents(switchForm.uplinksOriginal, response);
    }

    function getData() {
      var currentUplinkSwitchIds = _.map(switchForm.uplinks.selected, "id");
      var originalUplinkSwitchIds = _.map(
        switchForm.uplinksOriginal,
        "parent.id"
      );
      return {
        switch: _.assign(_.clone(switchForm.input), {
          groups: _.map(switchForm.groups.selected, "id"),
          function: switchForm.layer3 ? FUNCTION.LAYER_3 : FUNCTION.LAYER_2,
        }),
        uplinks: {
          add: _.difference(
            currentUplinkSwitchIds,
            originalUplinkSwitchIds
          ).map(function (addedSwitchId) {
            return {
              parent_id: addedSwitchId,
            };
          }),
          remove: _.filter(switchForm.uplinksOriginal, function (uplink) {
            return currentUplinkSwitchIds.indexOf(uplink.parent.id) === -1;
          }),
        },
      };
    }
  }
})();
