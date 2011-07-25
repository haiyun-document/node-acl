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
        callback(1001)
    catch e
      callback(e)
    return

  read: (data, callback) ->
    try
      if data._id?
        Access.findOne {_id: data._id}, (err, res) ->
          if err?
            callback(1004)
          else
            callback(null, res)
      else
        callback(1002)
    catch e
      callback(e)
    return
  
  update: (data, callback) ->
    try
      if data.length is 0
        Access.findOne {_id: data._id}, (err, res) ->
          if err?
            callback(1004)
          else
            if res?
              if data.slug?
                res.slug = data.slug
              if data.name?
                res.name = data.name
              if data.desc?
                res.desc = data.desc
              if data.enable?
                res.enable = data.enable

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
      Access.remove {_id: data._id}, (err, res) ->
        if err?
          callback(1007)
        else
          callback(null)
    catch e
      callback(e)
    return
  

module.exports =
  AccessModule: AccessModule

