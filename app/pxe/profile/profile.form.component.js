(function () {
  "use strict";

  var INPUTS = {
    name: "",
    billing_id: "",
    preseed: null,
    boot_script: null,
    access_client: false,
    time_until_marked_failed: "",
  };

  angular
    .module("app.pxe")
    .component("profileForm", {
      require: {},
      bindings: {
        form: "=",
      },
      controller: "ProfileFormCtrl as profileForm",
      transclude: true,
      templateUrl: "app/pxe/profile/profile.form.html",
    })
    .controller("ProfileFormCtrl", ProfileFormCtrl);

  /**
   * @ngInject
   */
  function ProfileFormCtrl(Select, Api, $scope, _) {
    var profileForm = this;
    var $profile = Api.all("pxe/profile");

    profileForm.$onInit = init;
    profileForm.input = _.clone(INPUTS);
    profileForm.platform = "linux";
    profileForm.preseeds = Select("pxe/preseed");
    profileForm.bootScripts = Select("pxe/template");
    profileForm.isos = Select("pxe/iso").on("change", onIsoChange);
    profileForm.isos.selectedEdition = null;
    profileForm.emailTemplate = Select("email/template");
    profileForm.shellScripts = {
      during: Select("pxe/shell").multi(),
      after: Select("pxe/shell").multi(),
    };
    profileForm.drivers = Select("pxe/driver").multi();

    profileForm.profilesToDuplicate = [];

    //////////

    function init() {
      profileForm.form.getData = getData;
      if (profileForm.form.loader && !profileForm.form.loader.active) {
        syncResponse(profileForm.form.input);
      }

      // create page
      profileForm.form.on("duplicate_profiles", duplicateProfiles);
      profileForm.form.on("create", setNextProfile);

      // edit page
      profileForm.form.on(["change", "load"], syncResponse);
    }

    function onIsoChange() {
      syncIso();
      $scope.$evalAsync(function () {
        profileForm.isos.selectedEdition = null;
      });
    }

    function syncIso() {
      var iso = profileForm.isos.selected;
      if (!iso) {
        return;
      }

      var url = "pxe/iso/" + iso.id + "/edition";
      $scope.$evalAsync(function () {
        profileForm.isos.editions = Select(url).filter({
          is_enabled: true,
        });
        profileForm.isos.editions.load();
      });
    }

    function setupIsoDefaults(iso) {
      profileForm.platform = !!iso ? "windows" : "linux";
      if (!iso) {
        profileForm.isos.editions = null;
        return;
      }
      profileForm.isos.selected = iso;
      profileForm.isos.selectedEdition = iso ? iso.edition : null;
    }

    function syncResponse(response) {
      _.overwrite(profileForm.input, profileForm.form.input);
      _.setContents(
        profileForm.shellScripts.during.selected,
        response.shell.during
      );
      _.setContents(
        profileForm.shellScripts.after.selected,
        response.shell.after
      );
      _.setContents(profileForm.drivers.selected, response.drivers);
      setupIsoDefaults(response.iso);
      profileForm.emailTemplate.selected = response.email.template;
    }

    function duplicateProfiles(profiles) {
      profileForm.profilesToDuplicate = profiles;
      setNextProfile();
    }

    function setNextProfile() {
      if (!profileForm.profilesToDuplicate.length) return;
      $profile
        .one("" + profileForm.profilesToDuplicate[0].id)
        .get()
        .then(_.assign.bind(null, profileForm.form.input)) // fill in input fields
        .then(syncResponse) // fill in the rest of the form (selects etc)
        .then(removeFromList);

      function removeFromList() {
        profileForm.profilesToDuplicate.splice(0, 1);
      }
    }

    function getData() {
      var data = _.clone(profileForm.input);

      data.shell = {
        during: _.map(profileForm.shellScripts.during.selected, "id"),
        after: _.map(profileForm.shellScripts.after.selected, "id"),
      };
      data.drivers = _.map(profileForm.drivers.selected, "id");
      data.iso =
        profileForm.platform == "windows" && profileForm.isos.selected
          ? {
              id: profileForm.isos.selected.id,
              edition: profileForm.isos.selectedEdition
                ? {
                    id: profileForm.isos.selectedEdition.id,
                  }
                : null,
            }
          : null;
      data.email = {
        template: {
          id: profileForm.emailTemplate.getSelected("id") || null,
        },
      };

      return data;
    }
  }
})();
