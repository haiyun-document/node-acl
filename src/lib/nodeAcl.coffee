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
    callback('Function not ready')
    return 

  deleteAccess: (data, callback) ->
    callback('Function not ready')
    return 
  
  ###
    AccessGroup
  ###  
  createAccessGroup: (data, callback) ->
    callback('Function not ready')
    return

  readAccessGroup: (data, callback) ->
    callback('Function not ready')
    return

  updateAccessGroup: (data, callback) ->
    callback('Function not ready')
    return 

  deleteAccessGroup: (data, callback) ->
    callback('Function not ready')
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