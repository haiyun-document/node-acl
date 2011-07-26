(function() {
  var Access, AccessGroup, EventPromise, NodeAcl, assert, insertStubs, invalidAddMock, invalidCreateAccess, invalidDeleteAccess, invalidDeleteMock, invalidUpdateAccess, invalidUpdateMock, manageAccessTest, perfectAddMock, perfectCreateAccess, perfectDeleteAccess, perfectDeleteMock, perfectReadAllAccess, perfectReadAllMock, perfectReadMock, perfectReadOneAccess, perfectUpdateAccess, perfectUpdateMock, setUp, tearDown, testPlayers, vows, _, _ref;
  vows = require('vows');
  assert = require('assert');
  NodeAcl = require('../lib/nodeAcl').NodeAcl;
  _ref = require('../lib/models'), Access = _ref.Access, AccessGroup = _ref.AccessGroup;
  EventPromise = require('events').EventEmitter;
  _ = require('underscore');
  manageAccessTest = vows.describe('Node ACL Test: Access Module');
  perfectAddMock = {
    slug: 'viewVIPPromo',
    name: 'View Vip promo',
    desc: 'Only VIP can view this promo',
    enable: true
  };
  invalidAddMock = {
    slug1: 'viewVIPPromo',
    name1: 'View Vip promo',
    desc1: 'Only VIP can view this promo',
    enable1: true
  };
  perfectReadMock = {
    slug: 'viewVIPPromo'
  };
  perfectReadAllMock = {};
  perfectUpdateMock = {
    slug: 'viewVIPPromo',
    newSlug: 'Updated slug!'
  };
  invalidUpdateMock = {
    slug: 'viewVIPPromo'
  };
  perfectDeleteMock = {
    slug: 'viewVIPPromo'
  };
  invalidDeleteMock = {
    slug1: 'viewVIPPromo'
  };
  testPlayers = [
    {
      _id: '4e1c70d0ec27dba3de555601',
      slug: 'testAccess',
      name: 'Test Access Name',
      desc: 'Test Access Desc',
      enable: true
    }
  ];
  insertStubs = function(callback) {
    var access;
    access = new Access();
    _.extend(access, testPlayers[0]);
    return access.save(function(err) {
      return callback(null, true);
    });
  };
  setUp = {
    'Setting up mocks': {
      topic: function() {
        var promise;
        promise = new EventPromise();
        insertStubs(function(err, result) {
          if (err != null) {
            return promise.emit('error', err);
          } else {
            return promise.emit('success', result);
          }
        });
        return promise;
      },
      'Done setting up stubs, initializing test:': function(err, result) {
        assert.isNull(err);
        return assert.isTrue(result);
      }
    }
  };
  tearDown = {
    'Tearing down...': {
      topic: function() {
        Access.remove({}, this.callback);
      },
      'Deleted all test stubs': function() {
        return module.exports = {};
      }
    }
  };
  perfectCreateAccess = {
    'Add new access to ACL db: --': {
      topic: perfectAddMock,
      'Given new access was added into ACL db successfully': {
        topic: function(data) {
          var acl;
          acl = new NodeAcl();
          return acl.createAccess(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  invalidCreateAccess = {
    'Add invalid access to ACL db: --': {
      topic: invalidAddMock,
      'Given access name is empty': {
        topic: function(data) {
          var acl;
          acl = new NodeAcl();
          return acl.createAccess(data, this.callback);
        },
        'THEN it should return an error code 1002': function(err, res) {
          return assert.equal(err, 1002);
        }
      }
    }
  };
  perfectReadOneAccess = {
    'Read one access from ACL db: --': {
      topic: perfectReadMock,
      'Given slug name is provided': {
        topic: function(data) {
          var acl;
          acl = new NodeAcl();
          return acl.readAccess(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  perfectReadAllAccess = {
    'Read all access from ACL db: --': {
      topic: perfectReadAllMock,
      'Given input parameter is empty': {
        topic: function(data) {
          var acl;
          acl = new NodeAcl();
          return acl.readAccess(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          assert.isNull(err);
          return assert.isArray(res);
        }
      }
    }
  };
  perfectUpdateAccess = {
    'Update ACL access: --': {
      topic: perfectUpdateMock,
      'Given input fields are valid': {
        topic: function(data) {
          var acl;
          acl = new NodeAcl();
          return acl.updateAccess(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  invalidUpdateAccess = {
    'Update ACL access with invalid input: --': {
      topic: invalidUpdateMock,
      'Given empty update fields': {
        topic: function(data) {
          var acl;
          acl = new NodeAcl();
          return acl.updateAccess(data, this.callback);
        },
        'THEN it should return an error code 1006': function(err, res) {
          return assert.equal(err, 1006);
        }
      }
    }
  };
  perfectDeleteAccess = {
    'Delete ACL access: --': {
      topic: perfectDeleteMock,
      'Given input fields are valid': {
        topic: function(data) {
          var acl;
          acl = new NodeAcl();
          return acl.deleteAccess(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  invalidDeleteAccess = {
    'Delete ACL access with invalid input: --': {
      topic: invalidDeleteMock,
      'Given invalid access id': {
        topic: function(data) {
          var acl;
          acl = new NodeAcl();
          return acl.deleteAccess(data, this.callback);
        },
        'THEN it should return an error code 1002': function(err, res) {
          return assert.equal(err, 1002);
        }
      }
    }
  };
  manageAccessTest.addBatch(setUp).addBatch(perfectCreateAccess).addBatch(invalidCreateAccess).addBatch(perfectReadOneAccess).addBatch(perfectReadAllAccess).addBatch(perfectUpdateAccess).addBatch(invalidUpdateAccess).addBatch(perfectDeleteAccess).addBatch(invalidDeleteAccess).addBatch(tearDown)["export"](module);
  /*
  perfectAssignAccessNoConflict = 
    'Assign access to player without conflict: --':
      topic: perfectAssignMock
      'Given access was assigned to player profile without any conflics':
        topic: (data) ->
  
        'THEN it should return no error': (err, res) ->
          assert.isNull err
      
  
  invalidPlayer =
    'Assign access to invalid player account: --':
      topic: invalidPlayerMock
      'Given invalid player account':
        topic: (data) ->
  
        'THEN it should return an error code 1001': (err, res) ->
          assert.equal err, 1001
  
  assignAccessWithConflict = 
    "Conflict found when assign access to player account: --":
      topic: assignConflictMock
      'Given conflict found when assigning acccess to player profile':
        topic: (data) ->
        'THEN it should return an error code 1002': (err, res) ->
          assert.equal err, 1002
  */
}).call(this);
