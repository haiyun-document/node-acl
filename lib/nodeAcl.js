(function() {
  var Access, AccessGroup, AccessGroupModule, AccessModule, NodeAcl, _, _ref;
  _ = require('underscore');
  AccessModule = require('./accessModule').AccessModule;
  AccessGroupModule = require('./accessGroupModule').AccessGroupModule;
  _ref = require('./models'), Access = _ref.Access, AccessGroup = _ref.AccessGroup;
  /*
  relationship = require('relationshipModule')
  conflictManager = require('conflictManagerModule')
  */
  NodeAcl = (function() {
    function NodeAcl() {}
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
      var accessModule;
      accessModule = new AccessModule();
      accessModule.update(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    };
    NodeAcl.prototype.deleteAccess = function(data, callback) {
      var accessModule;
      accessModule = new AccessModule();
      accessModule["delete"](data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    };
    /*
        AccessGroup
      */
    NodeAcl.prototype.createAccessGroup = function(data, callback) {
      var accessGroupModule;
      accessGroupModule = new AccessGroupModule();
      accessGroupModule.create(data, function(err, accessGroupId) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null, accessGroupId);
        }
      });
    };
    NodeAcl.prototype.readAccessGroup = function(data, callback) {
      var accessGroupModule;
      accessGroupModule = new AccessGroupModule();
      accessGroupModule.read(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      });
    };
    NodeAcl.prototype.updateAccessGroup = function(data, callback) {
      var accessGroupModule;
      accessGroupModule = new AccessGroupModule();
      accessGroupModule.update(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    };
    NodeAcl.prototype.deleteAccessGroup = function(data, callback) {
      var accessGroupModule;
      accessGroupModule = new AccessGroupModule();
      accessGroupModule["delete"](data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
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
