module.exports = [];

addImports('scp-angle');

function addImports(name) {
  var exported = require(name + '/exports.js');
  for (var i in exported) {
    addNestedImport(exported[i], name);
  }
}

function addNestedImport(exported, mod) {
  module.exports.push({
    name: exported.name,
    basedir: "node_modules/" + mod + "/" + (exported.basedir || ""),
    files: exported.files,
  });
}
