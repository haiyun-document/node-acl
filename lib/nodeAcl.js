(function() {
  var Access, AccessGroup, AccessGroupModule, AccessModule, NodeAcl, _, _ref;
  _ = require('underscore');
  AccessModule = require('./accessModule').AccessModule;
  AccessGroupModule = require('./accessGroupModule').AccessGroupModule;
  _ref = require('./models'), Access = _ref.Access, AccessGroup = _ref.AccessGroup;
  NodeAcl = (function() {
    function NodeAcl() {}
    /*
        Access
      */
    NodeAcl.prototype.createAccess = function(data, callback) {
      var accessModule;
      accessModule = new AccessModule();
      accessModule.create(data, function(err, accessId) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null, accessId);
        }
      });
    };
    NodeAcl.prototype.readAccess = function(data, callback) {
      var accessModule;
      accessModule = new AccessModule();
      accessModule.read(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      });
    };
    NodeAcl.prototype.updateAccess = function(data, callback) {
      callback('Function not ready');
    };
    NodeAcl.prototype.deleteAccess = function(data, callback) {
      callback('Function not ready');
    };
    /*
        AccessGroup
      */
    NodeAcl.prototype.createAccessGroup = function(data, callback) {
      callback('Function not ready');
    };
    NodeAcl.prototype.readAccessGroup = function(data, callback) {
      callback('Function not ready');
    };
    NodeAcl.prototype.updateAccessGroup = function(data, callback) {
      callback('Function not ready');
    };
    NodeAcl.prototype.deleteAccessGroup = function(data, callback) {
      callback('Function not ready');
    };
    /*
        Grant/Revoke
      */
    NodeAcl.prototype.grantAccess = function(data, callback) {
      callback('Function not ready');
    };
    NodeAcl.prototype.revokeAccess = function(data, callback) {
      callback('Function not ready');
    };
    NodeAcl.prototype.grantAccessGroup = function(data, callback) {
      callback('Function not ready');
    };
    NodeAcl.prototype.revokeAccessGroup = function(data, callback) {
      callback('Function not ready');
    };
    return NodeAcl;
  })();
  module.exports = {
    NodeAcl: NodeAcl
  };
}).call(this);
