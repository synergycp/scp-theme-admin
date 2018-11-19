var Util = require('scp-ng-util');

module.exports = [
  Util
    .export('scp-angle-admin', __dirname)
    .include([
      'scp-angle',
    ]),
];
