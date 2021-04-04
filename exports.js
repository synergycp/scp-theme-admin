var Util = require("scp-ng-util");

module.exports = [
  Util.export("scp-angle-admin", __dirname)
    .node([
      "codemirror/lib/codemirror.js",
      "codemirror/addon/search/searchcursor.js",
      "codemirror/lib/codemirror.css",
      "mergely/lib/mergely.js",
      "mergely/lib/mergely.css",
      "angular-mergely/dist/angular-mergely.css",
      "angular-mergely/dist/angular-mergely.js",
    ])
    .include(["scp-angle"]),
];
