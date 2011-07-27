(function() {
  var Access, AccessGroup, EventPromise, Request, assert, assignAccessGroupTest, assignAccessTest, insertStubs, invalidAccessAssignAccess, invalidAccessDeleteRequestAccess, invalidAccessDeleteRequestAccessGroup, invalidAccessDeleteRequestAccessMock, invalidAccessGroupAssignAccessGroup, invalidAccessGroupDeleteRequestAccessMock, invalidAccessGroupMock, invalidAccessMock, invalidAddMock, invalidCreateAccess, invalidDeleteAccess, invalidDeleteAccessGroup, invalidDeleteGroupMock, invalidDeleteMock, invalidRequestIdAccessGroupMock, invalidRequestIdAssignAccess, invalidRequestIdAssignAccessGroup, invalidRequestIdDeleteRequestAccess, invalidRequestIdDeleteRequestAccessGroup, invalidRequestIdDeleteRequestAccessGroupMock, invalidRequestIdDeleteRequestAccessMock, invalidRequestIdMock, invalidSlugAddGroupMock, invalidSlugCreateAccessGroup, invalidUpdateAccess, invalidUpdateAccessGroup, invalidUpdateGroupMock, invalidUpdateMock, manageAccessGroupTest, manageAccessTest, nodeAcl, perfectAccessUpdateAccessGroup, perfectAccessUpdateGroupMock, perfectAddGroupMock, perfectAddMock, perfectAssignAccess, perfectAssignAccessGroup, perfectAssignAccessGroupMock, perfectAssignAccessMock, perfectCreateAccess, perfectCreateGroupAccess, perfectDeleteAccess, perfectDeleteAccessGroup, perfectDeleteGroupMock, perfectDeleteMock, perfectDeleteRequestAccess, perfectDeleteRequestAccessGroup, perfectDeleteRequestAccessGroupMock, perfectDeleteRequestAccessMock, perfectReadAllAccess, perfectReadAllAccessGroup, perfectReadAllGroupMock, perfectReadAllMock, perfectReadGroupMock, perfectReadMock, perfectReadOneAccess, perfectReadOneAccessGroup, perfectSlugUpdateAccessGroup, perfectSlugUpdateGroupMock, perfectUpdateAccess, perfectUpdateMock, setUp, tearDown, testRequest, vows, _, _ref;
  vows = require('vows');
  assert = require('assert');
  nodeAcl = require('../lib/nodeAcl');
  _ref = require('../lib/models'), Access = _ref.Access, AccessGroup = _ref.AccessGroup, Request = _ref.Request;
  EventPromise = require('events').EventEmitter;
  _ = require('underscore');
  /*
  Manage Access Test
  */
  manageAccessTest = vows.describe('NodeACL Test: Access Module');
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
    newSlug: 'updatedSlug'
  };
  invalidUpdateMock = {
    slug: 'viewVIPPromo'
  };
  perfectDeleteMock = {
    slug: 'updatedSlug'
  };
  invalidDeleteMock = {
    slug1: 'updatedSlug'
  };
  testRequest = [
    {
      _id: '4e2fb6deb33baece6c1842cc',
      name: 'ManChoy',
      type: 'player'
    }
  ];
  /*
  testAccessGroup = [
    {
      _id: '4e1c70d0ec27dba3de555605'
      slug: 'testAccessGroup'
      name: 'Test Access Group'
      desc: 'Test Access Group Desc'
      access:
        _id: '4e1c70d0ec27dba3de555601'
        slug: 'testAccess'
        perm: 'allow'
    },
  ]
  */
  insertStubs = function(callback) {
    var request;
    request = new Request();
    _.extend(request, testRequest[0]);
    return request.save(function(err) {
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
    'Tearing down mocks...': {
      topic: {},
      'Tearing down request mock': {
        topic: function() {
          Request.remove({}, this.callback);
        },
        'Tear down request mock': function(err, res) {
          return assert.isNull(err);
        },
        'Deleted all test stubs': function() {
          return module.exports = {};
        }
      }
      /*    
      'Tearing down access group mock':
        topic: ->
          AccessGroup.remove({}, this.callback)
          return
        'Tear down access group mock': (err, res) ->
          assert.isNull err
        'Deleted all test stubs': ->
            module.exports = {}
      */
    }
  };
  perfectCreateAccess = {
    'Add new access to ACL db: --': {
      topic: perfectAddMock,
      'Given new access was added into ACL db successfully': {
        topic: function(data) {
          return nodeAcl.createAccess(data, this.callback);
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
          return nodeAcl.createAccess(data, this.callback);
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
          return nodeAcl.readAccess(data, this.callback);
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
          return nodeAcl.readAccess(data, this.callback);
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
          return nodeAcl.updateAccess(data, this.callback);
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
          return nodeAcl.updateAccess(data, this.callback);
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
          return nodeAcl.deleteAccess(data, this.callback);
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
      'Given invalid access slug': {
        topic: function(data) {
          return nodeAcl.deleteAccess(data, this.callback);
        },
        'THEN it should return an error code 1002': function(err, res) {
          return assert.equal(err, 1002);
        }
      }
    }
  };
  /*
  End of Manage Access Test
  */
  /*
  Manage Access Group Test
  */
  manageAccessGroupTest = vows.describe("NodeACL Test: AccessGroup Module");
  perfectAddGroupMock = {
    slug: 'VIPAccessGroup',
    name: 'VIP Access Group',
    desc: 'Put VIP accesses under this group',
    access: [
      {
        _id: '4e1c70d0ec27dba3de555610',
        slug: 'viewVIPPromo',
        perm: 'allow'
      }, {
        _id: '4e1c70d0ec27dba3de555611',
        slug: 'depositBonus',
        perm: 'deny'
      }
    ]
  };
  invalidSlugAddGroupMock = {
    name: 'VIP Access Group',
    desc: 'Put VIP accesses under this group',
    access: [
      {
        _id: '4e1c70d0ec27dba3de555612',
        slug: 'viewVIPPromo',
        perm: 'allow'
      }, {
        _id: '4e1c70d0ec27dba3de555613',
        slug: 'depositBonus',
        perm: 'deny'
      }
    ]
  };
  perfectReadGroupMock = {
    slug: 'VIPAccessGroup'
  };
  perfectReadAllGroupMock = {};
  perfectSlugUpdateGroupMock = {
    slug: 'VIPAccessGroup',
    newSlug: 'superVIPAccessGroup'
  };
  perfectAccessUpdateGroupMock = {
    slug: 'superVIPAccessGroup',
    newAccess: [
      {
        _id: '4e1c70d0ec27dba3de555612',
        slug: 'viewVIPTournament',
        perm: 'allow'
      }, {
        _id: '4e1c70d0ec27dba3de555613',
        slug: 'depositBonus',
        perm: 'allow'
      }
    ]
  };
  invalidUpdateGroupMock = {
    slug: 'superVIPAccessGroup'
  };
  perfectDeleteGroupMock = {
    slug: 'superVIPAccessGroup'
  };
  invalidDeleteGroupMock = {
    slug1: 'superVIPAccessGroup'
  };
  perfectCreateGroupAccess = {
    'Add new access group to ACL db: --': {
      topic: perfectAddGroupMock,
      'Given new access group was added into ACL db successfully': {
        topic: function(data) {
          return nodeAcl.createAccessGroup(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  invalidSlugCreateAccessGroup = {
    'Add invalid access group to ACL db: --': {
      topic: invalidSlugAddGroupMock,
      'Given access group slug is empty': {
        topic: function(data) {
          return nodeAcl.createAccessGroup(data, this.callback);
        },
        'THEN it should return an error code 1009': function(err, res) {
          return assert.equal(err, 1009);
        }
      }
    }
  };
  perfectReadOneAccessGroup = {
    'Read one access group from ACL db: --': {
      topic: perfectReadGroupMock,
      'Given slug name is provided': {
        topic: function(data) {
          return nodeAcl.readAccessGroup(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  perfectReadAllAccessGroup = {
    'Read all access group from ACL db: --': {
      topic: perfectReadAllGroupMock,
      'Given slug name is empty': {
        topic: function(data) {
          return nodeAcl.readAccessGroup(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          assert.isNull(err);
          return assert.isArray(res);
        }
      }
    }
  };
  perfectSlugUpdateAccessGroup = {
    'Update ACL access group: --': {
      topic: perfectSlugUpdateGroupMock,
      'Given old and new slug are valid': {
        topic: function(data) {
          return nodeAcl.updateAccessGroup(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  perfectAccessUpdateAccessGroup = {
    'Update ACL access group: --': {
      topic: perfectAccessUpdateGroupMock,
      'Given old slug and new access are valid': {
        topic: function(data) {
          return nodeAcl.updateAccessGroup(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  invalidUpdateAccessGroup = {
    'Update ACL access group with invalid input: --': {
      topic: invalidUpdateGroupMock,
      'Given empty update fields': {
        topic: function(data) {
          return nodeAcl.updateAccessGroup(data, this.callback);
        },
        'THEN it should return an error code 1006': function(err, res) {
          return assert.equal(err, 1009);
        }
      }
    }
  };
  perfectDeleteAccessGroup = {
    'Delete ACL access group: --': {
      topic: perfectDeleteGroupMock,
      'Given access group exists in ACL db': {
        topic: function(data) {
          return nodeAcl.deleteAccessGroup(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  invalidDeleteAccessGroup = {
    'Delete ACL access group with invalid input: --': {
      topic: invalidDeleteGroupMock,
      'Given access group doesnt exist': {
        topic: function(data) {
          return nodeAcl.deleteAccessGroup(data, this.callback);
        },
        'THEN it should return an error code 1009': function(err, res) {
          return assert.equal(err, 1009);
        }
      }
    }
  };
  /*
  End of Manage Access Group Test
  */
  /*
  Assign/unassign access test
  */
  assignAccessTest = vows.describe('NodeACL Test: Assign/Unassign Access Module');
  perfectAssignAccessMock = {
    _id: '4e2fb6deb33baece6c1842cc',
    access: [
      {
        _id: '4e1c70d0ec27dba3de555614',
        perm: 'allow'
      }, {
        _id: '4e1c70d0ec27dba3de555615',
        perm: 'deny'
      }
    ]
  };
  invalidRequestIdMock = {
    access: [
      {
        _id: '4e1c70d0ec27dba3de555614',
        perm: 'allow'
      }, {
        _id: '4e1c70d0ec27dba3de555615',
        perm: 'deny'
      }
    ]
  };
  invalidAccessMock = {
    _id: '4e2fb6deb33baece6c1842cc'
  };
  invalidRequestIdDeleteRequestAccessMock = {
    _id: '4e2fb6deb33baece6c1842c0'
  };
  invalidAccessDeleteRequestAccessMock = {
    _id: '4e2fb6deb33baece6c1842cc',
    access: []
  };
  perfectDeleteRequestAccessMock = {
    _id: '4e2fb6deb33baece6c1842cc',
    access: ['4e1c70d0ec27dba3de555614', '4e1c70d0ec27dba3de555615']
  };
  perfectAssignAccess = {
    'Perfect assignment of access to request object: --': {
      topic: perfectAssignAccessMock,
      'Given request id and access are valid': {
        topic: function(data) {
          nodeAcl.setRequestAccess(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  invalidRequestIdAssignAccess = {
    'Assign access to invalid request object: --': {
      topic: invalidRequestIdMock,
      'Given request id is invalid': {
        topic: function(data) {
          nodeAcl.setRequestAccess(data, this.callback);
        },
        'THEN it should return an error code 1013': function(err, res) {
          return assert.equal(err, 1013);
        }
      }
    }
  };
  invalidAccessAssignAccess = {
    'Assign access to invalid access: --': {
      topic: invalidAccessMock,
      'Given access is invalid': {
        topic: function(data) {
          nodeAcl.setRequestAccess(data, this.callback);
        },
        'THEN it should return an error code 1013': function(err, res) {
          return assert.equal(err, 1013);
        }
      }
    }
  };
  invalidRequestIdDeleteRequestAccess = {
    'Delete given access associated with request object: --': {
      topic: invalidRequestIdDeleteRequestAccessMock,
      'Given request id is invalid': {
        topic: function(data) {
          nodeAcl.deleteRequestAccess(data, this.callback);
        },
        'THEN it should return an error code 1018': function(err, res) {
          return assert.equal(err, 1018);
        }
      }
    }
  };
  invalidAccessDeleteRequestAccess = {
    'Delete given access associated with request object: --': {
      topic: invalidAccessDeleteRequestAccessMock,
      'Given access id is invalid': {
        topic: function(data) {
          nodeAcl.deleteRequestAccess(data, this.callback);
        },
        'THEN it should return an error code 1018': function(err, res) {
          return assert.equal(err, 1018);
        }
      }
    }
  };
  perfectDeleteRequestAccess = {
    'Delete access associated request object: --': {
      topic: perfectDeleteRequestAccessMock,
      'Given request id and access are valid': {
        topic: function(data) {
          nodeAcl.deleteRequestAccess(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  /*
  End of assign/unassign access test
  */
  /*
  Assign/unassign access group test
  */
  assignAccessGroupTest = vows.describe('NodeACL Test: Assign/Unassign Access Group Module');
  perfectAssignAccessGroupMock = {
    _id: '4e2fb6deb33baece6c1842cc',
    accessGroup: ['4e1c70d0ec27dba3de555614', '4e1c70d0ec27dba3de555615']
  };
  invalidRequestIdAccessGroupMock = {
    accessGroup: ['4e1c70d0ec27dba3de555614', '4e1c70d0ec27dba3de555615']
  };
  invalidAccessGroupMock = {
    _id: '4e2fb6deb33baece6c1842cc'
  };
  invalidRequestIdDeleteRequestAccessGroupMock = {
    _id: '4e2fb6deb33baece6c1842c0'
  };
  invalidAccessGroupDeleteRequestAccessMock = {
    _id: '4e2fb6deb33baece6c1842cc',
    accessGroup: []
  };
  perfectDeleteRequestAccessGroupMock = {
    _id: '4e2fb6deb33baece6c1842cc',
    accessGroup: ['4e1c70d0ec27dba3de555614', '4e1c70d0ec27dba3de555615']
  };
  perfectAssignAccessGroup = {
    'Perfect assignment of access group to request object: --': {
      topic: perfectAssignAccessGroupMock,
      'Given request id and access group are valid': {
        topic: function(data) {
          nodeAcl.setRequestAccessGroup(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  invalidRequestIdAssignAccessGroup = {
    'Assign access group to invalid request object: --': {
      topic: invalidRequestIdAccessGroupMock,
      'Given request id is invalid': {
        topic: function(data) {
          nodeAcl.setRequestAccessGroup(data, this.callback);
        },
        'THEN it should return an error code 1019': function(err, res) {
          return assert.equal(err, 1019);
        }
      }
    }
  };
  invalidAccessGroupAssignAccessGroup = {
    'Assign access group to invalid access: --': {
      topic: invalidAccessGroupMock,
      'Given access is invalid': {
        topic: function(data) {
          nodeAcl.setRequestAccessGroup(data, this.callback);
        },
        'THEN it should return an error code 1019': function(err, res) {
          return assert.equal(err, 1019);
        }
      }
    }
  };
  invalidRequestIdDeleteRequestAccessGroup = {
    'Delete given access group associated with request object: --': {
      topic: invalidRequestIdDeleteRequestAccessGroupMock,
      'Given request id is invalid': {
        topic: function(data) {
          nodeAcl.deleteRequestAccessGroup(data, this.callback);
        },
        'THEN it should return an error code 1024': function(err, res) {
          return assert.equal(err, 1024);
        }
      }
    }
  };
  invalidAccessDeleteRequestAccessGroup = {
    'Delete given access group associated with request object: --': {
      topic: invalidAccessGroupDeleteRequestAccessMock,
      'Given access group id is invalid': {
        topic: function(data) {
          nodeAcl.deleteRequestAccessGroup(data, this.callback);
        },
        'THEN it should return an error code 1024': function(err, res) {
          return assert.equal(err, 1024);
        }
      }
    }
  };
  perfectDeleteRequestAccessGroup = {
    'Delete access group associated request object: --': {
      topic: perfectDeleteRequestAccessGroupMock,
      'Given request id and access group are valid': {
        topic: function(data) {
          nodeAcl.deleteRequestAccessGroup(data, this.callback);
        },
        'THEN it should return no error': function(err, res) {
          return assert.isNull(err);
        }
      }
    }
  };
  /*
  End of assign/unassign access group test
  */
  manageAccessTest.addBatch(setUp).addBatch(perfectCreateAccess).addBatch(invalidCreateAccess).addBatch(perfectReadOneAccess).addBatch(perfectReadAllAccess).addBatch(perfectUpdateAccess).addBatch(invalidUpdateAccess).addBatch(perfectDeleteAccess).addBatch(invalidDeleteAccess)["export"](module);
  manageAccessGroupTest.addBatch(perfectCreateGroupAccess).addBatch(invalidSlugCreateAccessGroup).addBatch(perfectReadOneAccessGroup).addBatch(perfectReadAllAccessGroup).addBatch(perfectSlugUpdateAccessGroup).addBatch(perfectAccessUpdateAccessGroup).addBatch(invalidUpdateAccessGroup).addBatch(perfectDeleteAccessGroup).addBatch(invalidDeleteAccessGroup)["export"](module);
  assignAccessTest.addBatch(perfectAssignAccess).addBatch(invalidRequestIdAssignAccess).addBatch(invalidAccessAssignAccess).addBatch(invalidRequestIdDeleteRequestAccess).addBatch(invalidAccessDeleteRequestAccess).addBatch(perfectDeleteRequestAccess)["export"](module);
  assignAccessGroupTest.addBatch(perfectAssignAccessGroup).addBatch(invalidRequestIdAssignAccessGroup).addBatch(invalidAccessGroupAssignAccessGroup).addBatch(invalidRequestIdDeleteRequestAccessGroup).addBatch(invalidAccessDeleteRequestAccessGroup).addBatch(perfectDeleteRequestAccessGroup).addBatch(tearDown)["export"](module);
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
