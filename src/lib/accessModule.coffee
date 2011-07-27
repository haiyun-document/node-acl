_ = require('underscore')
{Access} = require('./models')


class AccessModule
  create: (data, callback) ->
    try
      if data.slug? and data.name?
        access = new Access()
        _.extend(access, data)
        access.save (err) ->
          if err?
            callback(1003)
          else
            accessId = access._id.toString()
            callback(null,accessId)
      else
        callback(1002)
    catch e
      callback(e)
    return

  read: (data, callback) ->
    try
      if data.slug?
        Access.findOne {_id: data.id}, (err, res) ->
          if err?
            callback(1004)
          else
            callback(null, res)
      else
        Access.find {}, (err, res) ->
          if err?
            callback(1004)
          else
            callback(null, res)
    catch e
      callback(e)
    return
  
  update: (data, callback) ->
    try
      if data.slug? and (data.newSlug? or data.newName? or data.newEnable? or data.newDesc?)
        Access.findOne {_id: data.id}, (err, res) ->
          if err?
            callback(1004)
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

              res.save (err) ->
                if err?
                  callback(1003)
                else
                  callback(null)
            else
              callback(1005)
      else
        callback(1006)
    catch e
      callback(e)
    return

  delete: (data, callback) ->
    try
      if data.id?
        Access.remove {_id: data.id}, (err, res) ->
          if err?
            callback(1007)
          else
            callback(null)
      else
        callback(1002)
    catch e
      callback(e)
    return
  

module.exports =
  AccessModule: AccessModule

