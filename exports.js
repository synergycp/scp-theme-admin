module.exports = [];

addImports('scp-angle');

function addImports(name) {
  var exported = require(name + '/exports.js');
  for (var i in exported) {
    module.exports.push(exported[i]);
  }
}
