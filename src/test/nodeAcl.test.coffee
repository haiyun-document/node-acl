vows = require('vows')
assert = require('assert')
{NodeAcl} = require('../lib/nodeAcl')
{Access,AccessGroup} = require('../lib/models')
EventPromise = require('events').EventEmitter
_ = require('underscore')

manageAccessTest = vows.describe('Node ACL Test: Access Module')

perfectAddMock =
  slug: 'viewVIPPromo'
  name: 'View Vip promo'
  desc: 'Only VIP can view this promo'
  enable: true

invalidAddMock =
  slug1: 'viewVIPPromo'
  name1: 'View Vip promo'
  desc1: 'Only VIP can view this promo'
  enable1: true

perfectReadMock =
  slug: 'viewVIPPromo'

perfectReadAllMock = {}

perfectUpdateMock =
  slug: 'viewVIPPromo'
  newSlug: 'Updated slug!'

invalidUpdateMock =
  slug: 'viewVIPPromo'


perfectDeleteMock =
  slug: 'viewVIPPromo'

invalidDeleteMock =
  slug1: 'viewVIPPromo'



testPlayers = [
  {
    _id: '4e1c70d0ec27dba3de555601'
    slug: 'testAccess'
    name: 'Test Access Name'
    desc: 'Test Access Desc'
    enable: true
  }
]

insertStubs = (callback) ->
  access = new Access()
  _.extend(access, testPlayers[0])
  access.save (err) ->
    callback(null, true)
  
setUp =
  'Setting up mocks':
    topic: ->
      promise = new EventPromise()
      insertStubs (err, result) ->
        if err? then promise.emit('error', err)
        else promise.emit('success', result)
      promise
    'Done setting up stubs, initializing test:': (err, result) ->
      assert.isNull err
      assert.isTrue result

tearDown =
  'Tearing down...':
    topic: ->
      Access.remove({}, this.callback)
      return
    'Deleted all test stubs': ->
      module.exports = {}


perfectCreateAccess = 
  'Add new access to ACL db: --':
    topic: perfectAddMock
    'Given new access was added into ACL db successfully':
      topic: (data) ->
        acl = new NodeAcl()
        acl.createAccess(data, this.callback)
      'THEN it should return no error': (err, res) ->
        assert.isNull err

invalidCreateAccess = 
  'Add invalid access to ACL db: --':
    topic: invalidAddMock
    'Given access name is empty':
      topic: (data) ->
        acl = new NodeAcl()
        acl.createAccess(data, this.callback)
      'THEN it should return an error code 1002': (err, res) ->
        assert.equal err, 1002

perfectReadOneAccess = 
  'Read one access from ACL db: --':
    topic: perfectReadMock
    'Given slug name is provided':
      topic: (data) ->
        acl = new NodeAcl()
        acl.readAccess(data, this.callback)
      'THEN it should return no error': (err, res) ->
        assert.isNull err

perfectReadAllAccess = 
  'Read all access from ACL db: --':
    topic: perfectReadAllMock
    'Given input parameter is empty':
      topic: (data) ->
        acl = new NodeAcl()
        acl.readAccess(data, this.callback)
      'THEN it should return no error': (err, res) ->
        assert.isNull err
        assert.isArray res

perfectUpdateAccess = 
  'Update ACL access: --':
    topic: perfectUpdateMock
    'Given input fields are valid':
      topic: (data) ->
        acl = new NodeAcl()
        acl.updateAccess(data, this.callback)
      'THEN it should return no error': (err, res) ->
        assert.isNull err


invalidUpdateAccess = 
  'Update ACL access with invalid input: --':
    topic: invalidUpdateMock
    'Given empty update fields':
      topic: (data) ->
        acl = new NodeAcl()
        acl.updateAccess(data, this.callback)
      'THEN it should return an error code 1006': (err, res) ->
        assert.equal err, 1006


perfectDeleteAccess = 
  'Delete ACL access: --':
    topic: perfectDeleteMock
    'Given input fields are valid':
      topic: (data) ->
        acl = new NodeAcl()
        acl.deleteAccess(data, this.callback)
      'THEN it should return no error': (err, res) ->
        assert.isNull err


invalidDeleteAccess = 
  'Delete ACL access with invalid input: --':
    topic: invalidDeleteMock
    'Given invalid access id':
      topic: (data) ->
        acl = new NodeAcl()
        acl.deleteAccess(data, this.callback)
      'THEN it should return an error code 1002': (err, res) ->
        assert.equal err, 1002

manageAccessTest
  .addBatch(setUp)
  .addBatch(perfectCreateAccess)
  .addBatch(invalidCreateAccess)
  .addBatch(perfectReadOneAccess)
  .addBatch(perfectReadAllAccess)
  .addBatch(perfectUpdateAccess)
  .addBatch(invalidUpdateAccess)
  .addBatch(perfectDeleteAccess)
  .addBatch(invalidDeleteAccess)
  .addBatch(tearDown)
  .export(module)
###
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
###
