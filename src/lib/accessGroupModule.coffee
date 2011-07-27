_ = require('underscore')
{AccessGroup} = require('./models')


class AccessGroupModule

  create: (data, callback) ->
    try
      if data.slug? and data.name?
        accessGroup = new AccessGroup()
        _.extend(accessGroup, data)
        accessGroup.save (err) ->
          if err?
            callback(1008)
          else
            accessGroupId = accessGroup._id.toString()
            callback(null,accessGroupId)
      else
        callback(1009)
    catch e
      callback(e)
    return

  read: (data, callback) ->
    try
      if data.slug?
        AccessGroup.findOne {_id: data.id}, (err, res) ->
          if err?
            callback(1010)
          else
            callback(null, res)
      else
        AccessGroup.find {}, (err, res) ->
          if err?
            callback(1010)
          else
            callback(null, res)
    catch e
      callback(e)
    return
  
  update: (data, callback) ->
    try
      if data.id? and (data.newSlug? or data.newName? or data.newEnable? or data.newDesc? or data.newAccess)
        AccessGroup.findOne {_id: data.id}, (err, res) ->
          if err?
            callback(1010)
          else
            if res?
              if data.newSlug?
                res.slug = data.newSlug
              if data.newName?
                res.name = data.newName
              if data.newDesc?
                res.desc = data.newDesc
              if data.newEnable?
                res.enable = data.newEnable
              if data.newAccess?
                res.access = data.newAccess

              res.save (err) ->
                if err?
                  callback(1010)
                else
                  callback(null)
            else
              callback(1011)
      else
        callback(1009)
    catch e
      callback(e)
    return

  delete: (data, callback) ->
    try
      if data.id?
        AccessGroup.remove {_id: data.id}, (err, res) ->
          if err?
            callback(1012)
          else
            callback(null)
      else
        callback(1009)
    catch e
      callback(e)
    return
  

module.exports =
  AccessGroupModule: AccessGroupModule

