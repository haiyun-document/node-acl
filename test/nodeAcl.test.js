(function() {
  var Access, AccessGroup, EventPromise, NodeAcl, assert, insertStubs, invalidAddMock, invalidCreateAccess, invalidReadAccess, invalidReadMock, manageAccessTest, perfectAddMock, perfectCreateAccess, perfectReadAccess, perfectReadMock, setUp, tearDown, testPlayers, vows, _, _ref;
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
    _id: '4e1c70d0ec27dba3de555601'
  };
  invalidReadMock = {
    _id1: '4e1c70d0ec27dba3de555601'
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
        'THEN it should return an error code 1001': function(err, res) {
          return assert.equal(err, 1001);
        }
      }
    }
  };
  perfectReadAccess = {
    'Read access from ACL db: --': {
      topic: perfectReadMock,
      'Given access is found on ACL db': {
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
  invalidReadAccess = {
    'Invalid read from ACL db: --': {
      topic: invalidReadMock,
      'Given access name is not found in ACL db': {
        topic: function(data) {
          var acl;
          acl = new NodeAcl();
          return acl.readAccess(data, this.callback);
        },
        'THEN it should return an error code 1002': function(err, res) {
          return assert.equal(err, 1002);
        }
      }
    }
  };
  manageAccessTest.addBatch(setUp).addBatch(perfectCreateAccess).addBatch(invalidCreateAccess).addBatch(perfectReadAccess).addBatch(invalidReadAccess).addBatch(tearDown)["export"](module);
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
