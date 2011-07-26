(function() {
  var Access, AccessGroup, AccessGroupModule, AccessModule, nodeAcl, _, _ref;
  _ = require('underscore');
  AccessModule = require('./accessModule').AccessModule;
  AccessGroupModule = require('./accessGroupModule').AccessGroupModule;
  _ref = require('./models'), Access = _ref.Access, AccessGroup = _ref.AccessGroup;
  nodeAcl = {
    createAccess: function(data, callback) {
      var accessModule;
      accessModule = new AccessModule();
      accessModule.create(data, function(err, accessId) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null, accessId);
        }
      });
    },
    readAccess: function(data, callback) {
      var accessModule;
      accessModule = new AccessModule();
      accessModule.read(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      });
    },
    updateAccess: function(data, callback) {
      var accessModule;
      accessModule = new AccessModule();
      accessModule.update(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    },
    deleteAccess: function(data, callback) {
      var accessModule;
      accessModule = new AccessModule();
      accessModule["delete"](data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    },
    createAccessGroup: function(data, callback) {
      var accessGroupModule;
      accessGroupModule = new AccessGroupModule();
      accessGroupModule.create(data, function(err, accessGroupId) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null, accessGroupId);
        }
      });
    },
    readAccessGroup: function(data, callback) {
      var accessGroupModule;
      accessGroupModule = new AccessGroupModule();
      accessGroupModule.read(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null, result);
        }
      });
    },
    updateAccessGroup: function(data, callback) {
      var accessGroupModule;
      accessGroupModule = new AccessGroupModule();
      accessGroupModule.update(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    },
    deleteAccessGroup: function(data, callback) {
      var accessGroupModule;
      accessGroupModule = new AccessGroupModule();
      accessGroupModule["delete"](data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    },
    grantAccess: function(data, callback) {
      callback('Function not ready');
    },
    revokeAccess: function(data, callback) {
      callback('Function not ready');
    },
    grantAccessGroup: function(data, callback) {
      callback('Function not ready');
    },
    revokeAccessGroup: function(data, callback) {
      callback('Function not ready');
    }
  };
  module.exports = nodeAcl;
}).call(this);
