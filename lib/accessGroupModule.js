(function() {
  var AccessGroup, AccessGroupModule, _;
  _ = require('underscore');
  AccessGroup = require('./models').AccessGroup;
  AccessGroupModule = (function() {
    function AccessGroupModule() {}
    AccessGroupModule.prototype.create = function(data, callback) {
      var accessGroup;
      try {
        if ((data.slug != null) && (data.name != null)) {
          accessGroup = new AccessGroup();
          _.extend(accessGroup, data);
          accessGroup.save(function(err) {
            var accessGroupId;
            if (err != null) {
              return callback(1008);
            } else {
              accessGroupId = accessGroup._id.toString();
              return callback(null, accessGroupId);
            }
          });
        } else {
          callback(1009);
        }
      } catch (e) {
        callback(e);
      }
    };
    AccessGroupModule.prototype.read = function(data, callback) {
      try {
        if (data.slug != null) {
          AccessGroup.findOne({
            _id: data.id
          }, function(err, res) {
            if (err != null) {
              return callback(1010);
            } else {
              return callback(null, res);
            }
          });
        } else {
          AccessGroup.find({}, function(err, res) {
            if (err != null) {
              return callback(1010);
            } else {
              return callback(null, res);
            }
          });
        }
      } catch (e) {
        callback(e);
      }
    };
    AccessGroupModule.prototype.update = function(data, callback) {
      try {
        if ((data.slug != null) && ((data.newSlug != null) || (data.newName != null) || (data.newEnable != null) || (data.newDesc != null) || data.newAccess)) {
          AccessGroup.findOne({
            _id: data.id
          }, function(err, res) {
            if (err != null) {
              return callback(1010);
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
                if (data.newAccess != null) {
                  res.access = data.newAccess;
                }
                return res.save(function(err) {
                  if (err != null) {
                    return callback(1010);
                  } else {
                    return callback(null);
                  }
                });
              } else {
                return callback(1011);
              }
            }
          });
        } else {
          callback(1009);
        }
      } catch (e) {
        callback(e);
      }
    };
    AccessGroupModule.prototype["delete"] = function(data, callback) {
      try {
        if (data.id != null) {
          AccessGroup.remove({
            _id: data.id
          }, function(err, res) {
            if (err != null) {
              return callback(1012);
            } else {
              return callback(null);
            }
          });
        } else {
          callback(1009);
        }
      } catch (e) {
        callback(e);
      }
    };
    return AccessGroupModule;
  })();
  module.exports = {
    AccessGroupModule: AccessGroupModule
  };
}).call(this);
