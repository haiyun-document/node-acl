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
          callback(1002);
        }
      } catch (e) {
        callback(e);
      }
    };
    AccessModule.prototype.read = function(data, callback) {
      try {
        if (data.slug != null) {
          Access.findOne({
            _id: data.id
          }, function(err, res) {
            if (err != null) {
              return callback(1004);
            } else {
              return callback(null, res);
            }
          });
        } else {
          Access.find({}, function(err, res) {
            if (err != null) {
              return callback(1004);
            } else {
              return callback(null, res);
            }
          });
        }
      } catch (e) {
        callback(e);
      }
    };
    AccessModule.prototype.update = function(data, callback) {
      try {
        if ((data.slug != null) && ((data.newSlug != null) || (data.newName != null) || (data.newEnable != null) || (data.newDesc != null))) {
          Access.findOne({
            _id: data.id
          }, function(err, res) {
            if (err != null) {
              return callback(1004);
            } else {
              if (res != null) {
                if (data.newSlug != null) {
                  res.slug = data.newSlug;
                }
                if (data.newName != null) {
                  res.name = data.newName;
                }
                if (data.newDesc != null) {
                  res.desc = data.newDesc;
                }
                if (data.newEnable != null) {
                  res.enable = data.newEnable;
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
        if (data.id != null) {
          Access.remove({
            _id: data.id
          }, function(err, res) {
            if (err != null) {
              return callback(1007);
            } else {
              return callback(null);
            }
          });
        } else {
          callback(1002);
        }
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
