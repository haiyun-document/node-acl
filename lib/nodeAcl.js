(function() {
  var AccessGroupModule, AccessModule, RequestModule, nodeAcl, _;
  _ = require('underscore');
  AccessModule = require('./accessModule').AccessModule;
  AccessGroupModule = require('./accessGroupModule').AccessGroupModule;
  RequestModule = require('./requestModule').RequestModule;
  /*
  relationship = require('relationshipModule')
  conflictManager = require('conflictManagerModule')
  */
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
    /*
        AccessGroup
      */
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
    /*
        Assign/Unassign
      */
    setRequestAccess: function(data, callback) {
      var requestModule;
      requestModule = new RequestModule();
      requestModule.setRequestAccess(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    },
    deleteRequestAccess: function(data, callback) {
      var requestModule;
      requestModule = new RequestModule();
      requestModule.deleteRequestAccess(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    },
    setRequestAccessGroup: function(data, callback) {
      var requestModule;
      requestModule = new RequestModule();
      requestModule.setRequestAccessGroup(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    },
    deleteRequestAccessGroup: function(data, callback) {
      var requestModule;
      requestModule = new RequestModule();
      requestModule.deleteRequestAccessGroup(data, function(err, result) {
        if (err != null) {
          return callback(err);
        } else {
          return callback(null);
        }
      });
    }
  };
  module.exports = nodeAcl;
}).call(this);
