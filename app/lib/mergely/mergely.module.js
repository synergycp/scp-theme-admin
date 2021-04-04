(function () {
  angular.module("app.lib.mergely", []);
  angular.module("app.lib.mergely").config(includeMergelyRoutingHelper);

  var NODE = "vendor/scp-angle-admin/node_modules/";

  function includeMergelyRoutingHelper(APP_REQUIRES) {
    APP_REQUIRES.modules.push({
      name: "codemirror",
      files: [
        NODE + "codemirror/lib/codemirror.js",
        NODE + "codemirror/lib/codemirror.css",
      ],
    });
    APP_REQUIRES.modules.push({
      name: "mergely",
      files: [
        NODE + "codemirror/addon/search/searchcursor.js",
        NODE + "mergely/lib/mergely.css",
        NODE + "mergely/lib/mergely.js",
        NODE + "angular-mergely/dist/angular-mergely.css",
        NODE + "angular-mergely/dist/angular-mergely.js",
      ],
    });
  }
})();
