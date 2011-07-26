_ = require('underscore')
{AccessModule} = require('./accessModule')
{AccessGroupModule} = require('./accessGroupModule')
{Access,AccessGroup} = require('./models')
#relationship = require('relationshipModule')
#conflictManager = require('conflictManagerModule')
class NodeAcl
  ###
    Access
  ###
  createAccess: (data, callback) ->
    accessModule = new AccessModule()
    accessModule.create data, (err, accessId) ->
      if err?
        callback(err)
      else
        callback(null,accessId)
    return

  readAccess: (data, callback) ->
    accessModule = new AccessModule()
    accessModule.read data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null,result)
    return

  updateAccess: (data, callback) ->
    accessModule = new AccessModule()
    accessModule.update data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null)
    return 

  deleteAccess: (data, callback) ->
    accessModule = new AccessModule()
    accessModule.delete data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null)
    return 
  
  ###
    AccessGroup
  ###  
  createAccessGroup: (data, callback) ->
    accessGroupModule = new AccessGroupModule()
    accessGroupModule.create data, (err, accessGroupId) ->
      if err?
        callback(err)
      else
        callback(null,accessGroupId)
    return

  readAccessGroup: (data, callback) ->
    accessGroupModule = new AccessGroupModule()
    accessGroupModule.read data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null,result)
    return

  updateAccessGroup: (data, callback) ->
    accessGroupModule = new AccessGroupModule()
    accessGroupModule.update data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null)
    return 

  deleteAccessGroup: (data, callback) ->
    accessGroupModule = new AccessGroupModule()
    accessGroupModule.delete data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null)
    return 

  ###
    Grant/Revoke
  ###
  grantAccess: (data, callback) ->
    callback('Function not ready')
    return

  revokeAccess: (data, callback) ->
    callback('Function not ready')
    return

  grantAccessGroup: (data, callback) ->
    callback('Function not ready')
    return 

  revokeAccessGroup: (data, callback) ->
    callback('Function not ready')
    return


module.exports =
  NodeAcl: NodeAcl