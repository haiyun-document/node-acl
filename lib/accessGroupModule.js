(function() {
  var AccessGroup, AccessGroupModule, _;
  _ = require('underscore');
  AccessGroup = require('./models').AccessGroup;
  AccessGroupModule = (function() {
    function AccessGroupModule(attr, callback) {
      _.extend(this, attr);
    }
    return AccessGroupModule;
  })();
  module.exports = {
    AccessGroupModule: AccessGroupModule
  };
}).call(this);
