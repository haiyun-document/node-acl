(function() {
  var Access, AccessModule, _;
  _ = require('underscore');
  Access = require('./models').Access;
  AccessModule = (function() {
    function AccessModule() {}
    AccessModule.prototype.create = function(data, callback) {
      var access;
      try {
        if ((data.slug != null) && (data.name != null)) {
          access = new Access();
          _.extend(access, data);
          access.save(function(err) {
            var accessId;
            if (err != null) {
              return callback(1003);
            } else {
              accessId = access._id.toString();
              return callback(null, accessId);
            }
          });
        } else {
          callback(1001);
        }
      } catch (e) {
        callback(e);
      }
    };
    AccessModule.prototype.read = function(data, callback) {
      try {
        if (data._id != null) {
          Access.findOne({
            _id: data._id
          }, function(err, res) {
            if (err != null) {
              return callback(1004);
            } else {
              return callback(null, res);
            }
          });
        } else {
          callback(1002);
        }
      } catch (e) {
        callback(e);
      }
    };
    AccessModule.prototype.update = function(data, callback) {
      try {
        if (data.length === 0) {
          Access.findOne({
            _id: data._id
          }, function(err, res) {
            if (err != null) {
              return callback(1004);
            } else {
              if (res != null) {
                if (data.slug != null) {
                  res.slug = data.slug;
                }
                if (data.name != null) {
                  res.name = data.name;
                }
                if (data.desc != null) {
                  res.desc = data.desc;
                }
                if (data.enable != null) {
                  res.enable = data.enable;
                }
                return res.save(function(err) {
                  if (err != null) {
                    return callback(1003);
                  } else {
                    return callback(null);
                  }
                });
              } else {
                return callback(1005);
              }
            }
          });
        } else {
          callback(1006);
        }
      } catch (e) {
        callback(e);
      }
    };
    AccessModule.prototype["delete"] = function(data, callback) {
      try {
        Access.remove({
          _id: data._id
        }, function(err, res) {
          if (err != null) {
            return callback(1007);
          } else {
            return callback(null);
          }
        });
      } catch (e) {
        callback(e);
      }
    };
    return AccessModule;
  })();
  module.exports = {
    AccessModule: AccessModule
  };
}).call(this);
