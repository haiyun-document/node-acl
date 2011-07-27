(function() {
  var Request, RequestModule, _;
  _ = require('underscore');
  Request = require('./models').Request;
  RequestModule = (function() {
    function RequestModule() {}
    RequestModule.prototype.setRequestAccess = function(data, callback) {
      if ((data._id != null) && (data.access != null) && data.access.length > 0) {
        Request.findOne({
          _id: data._id
        }, function(err, res) {
          if (err != null) {
            return callback(1014);
          } else {
            if (res != null) {
              _.each(data.access, function(access) {
                return res.access.push({
                  _id: access._id,
                  perm: access.perm
                });
              });
              return res.save(function(err) {
                if (err != null) {
                  return callback(1014);
                } else {
                  return callback(null);
                }
              });
            } else {
              return callback(1015);
            }
          }
        });
      } else {
        callback(1013);
      }
    };
    RequestModule.prototype.deleteRequestAccess = function(data, callback) {
      if ((data._id != null) && (data.access != null) && data.access.length > 0) {
        Request.findOne({
          _id: data._id
        }, function(err, res) {
          if (err != null) {
            return callback(1017);
          } else {
            if (res != null) {
              _.each(data.access, function(access) {
                return _.each(res.access, function(resAccess, index) {
                  if (resAccess._id === access) {
                    return res.access.splice(index, 1);
                  }
                });
              });
              return res.save(function(err) {
                if (err != null) {
                  return callback(1017);
                } else {
                  return callback(null);
                }
              });
            } else {
              return callback(1016);
            }
          }
        });
      } else {
        callback(1018);
      }
    };
    RequestModule.prototype.setRequestAccessGroup = function(data, callback) {
      if ((data._id != null) && (data.accessGroup != null) && data.accessGroup.length > 0) {
        Request.findOne({
          _id: data._id
        }, function(err, res) {
          if (err != null) {
            return callback(1020);
          } else {
            if (res != null) {
              _.each(data.accessGroup, function(accessGroupId) {
                return res.accessGroup.push(accessGroupId);
              });
              return res.save(function(err) {
                if (err != null) {
                  return callback(1020);
                } else {
                  return callback(null);
                }
              });
            } else {
              return callback(1021);
            }
          }
        });
      } else {
        callback(1019);
      }
    };
    RequestModule.prototype.deleteRequestAccessGroup = function(data, callback) {
      if ((data._id != null) && (data.accessGroup != null) && data.accessGroup.length > 0) {
        Request.findOne({
          _id: data._id
        }, function(err, res) {
          if (err != null) {
            return callback(1023);
          } else {
            if (res != null) {
              _.each(data.accessGroup, function(accessGroupId) {
                return _.each(res.accessGroup, function(resAccessGroup, index) {
                  if (resAccessGroup === accessGroupId) {
                    return res.accessGroup.splice(index, 1);
                  }
                });
              });
              return res.save(function(err) {
                if (err != null) {
                  return callback(1023);
                } else {
                  return callback(null);
                }
              });
            } else {
              return callback(1022);
            }
          }
        });
      } else {
        callback(1024);
      }
    };
    return RequestModule;
  })();
  module.exports = {
    RequestModule: RequestModule
  };
}).call(this);
