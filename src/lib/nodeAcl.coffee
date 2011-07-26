# Module requires
_ = require('underscore')
{AccessModule} = require('./accessModule')
{AccessGroupModule} = require('./accessGroupModule')
{Access,AccessGroup} = require('./models')

# relationship = require('relationshipModule')
# conflictManager = require('conflictManagerModule')

# Main function object
nodeAcl = 
  
  # ## Access
  
  # `createAccess`: Creates a new access object
  #
  #     data:
  #       slug: String, machine readable slug name
  #       name: String, human readable name
  #       desc: String, description
  #       enabled: Boolean
  
  createAccess: (data, callback) ->
    accessModule = new AccessModule()
    accessModule.create data, (err, accessId) ->
      if err?
        callback(err)
      else
        callback(null,accessId)
    return

  # `readAccess`: Returns a single or all access items
  #
  #     data: 
  #       slug: (optional) String
  
  readAccess: (data, callback) ->
    accessModule = new AccessModule()
    accessModule.read data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null,result)
    return
    
  # `updateAccess`: Updates access object
  #
  #     data: 
  #       slug: (Required) String, machine readable slug name
  #       name: String, human readable name
  #       desc: String, description
  #       enabled: Boolean
  
  updateAccess: (data, callback) ->
    accessModule = new AccessModule()
    accessModule.update data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null)
    return 
    
  # `deleteAccess`: Deletes access object
  #
  #     data: 
  #       slug: (Required) String, machine readable slug name
  
  deleteAccess: (data, callback) ->
    accessModule = new AccessModule()
    accessModule.delete data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null)
    return 
  
  # ## Access Group

  # `createAccessGroup`: Creates a new access group object
  #
  #     data: 
  #       slug: (Required) String, machine readable slug name
  #       name: (Required) String, human readable name
  #       desc: String, description
  #       access: [
  #         _id: ObjectId, id for access to include
  #         slug: String, slug for access to include
  #         perm: String, 'allow/deny'
  #       ]
  
  createAccessGroup: (data, callback) ->
    accessGroupModule = new AccessGroupModule()
    accessGroupModule.create data, (err, accessGroupId) ->
      if err?
        callback(err)
      else
        callback(null,accessGroupId)
    return

  # `readAccessGroup`: Returns a single or all access items
  #
  #     data: 
  #       slug: (optional) String

  readAccessGroup: (data, callback) ->
    accessGroupModule = new AccessGroupModule()
    accessGroupModule.read data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null,result)
    return

  # `updateAccessGroup`: Updates access group object
  #
  #     data: 
  #       slug: (Required) String, machine readable slug name
  #       name: (Required) String, human readable name
  #       desc: String, description
  #       access: [
  #         _id: ObjectId, id for access to include
  #         slug: String, slug for access to include
  #         perm: String, 'allow/deny'
  #       ]

  updateAccessGroup: (data, callback) ->
    accessGroupModule = new AccessGroupModule()
    accessGroupModule.update data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null)
    return 

  # `deleteAccessGroup`: Deletes access group object
  #
  #     data: 
  #       slug: (Required) String, machine readable slug name

  deleteAccessGroup: (data, callback) ->
    accessGroupModule = new AccessGroupModule()
    accessGroupModule.delete data, (err, result) ->
      if err?
        callback(err)
      else
        callback(null)
    return 

  # ## Grant/Revoke
  
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

# Module exports
module.exports = nodeAcl