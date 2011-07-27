_ = require('underscore')
{Request} = require('./models')


class RequestModule

  setRequestAccess: (data, callback) ->
    if data._id? and data.access? and data.access.length > 0
      Request.findOne {_id: data._id}, (err, res) ->
        if err?
          callback(1014)
        else
          if res?
            _.each data.access,(access) ->
              res.access.push
                _id: access._id
                perm: access.perm

            res.save (err) ->
              if err?
                callback(1014)
              else
                callback(null)
          else
            callback(1015)
    else
      callback(1013)
    return

  deleteRequestAccess: (data, callback) ->
    if data._id? and data.access? and data.access.length > 0
      Request.findOne {_id: data._id}, (err, res) ->
        if err?
          callback(1017)
        else
          if res?
            _.each data.access, (access) ->
              _.each res.access, (resAccess, index) ->
                if resAccess._id is access
                  res.access.splice(index, 1)
            res.save (err) ->
              if err?
                callback(1017)
              else
                callback(null)
          else
            callback(1016)
    else
      callback(1018)
    return

  setRequestAccessGroup: (data, callback) ->
    if data._id? and data.accessGroup? and data.accessGroup.length > 0
      Request.findOne {_id: data._id}, (err, res) ->
        if err?
          callback(1020)
        else
          if res?
            _.each data.accessGroup,(accessGroupId) ->
              res.accessGroup.push accessGroupId
            res.save (err) ->
              if err?
                callback(1020)
              else
                callback(null)
          else
            callback(1021)
    else
      callback(1019)
    return

  deleteRequestAccessGroup: (data, callback) ->
    if data._id? and data.accessGroup? and data.accessGroup.length > 0
      Request.findOne {_id: data._id}, (err, res) ->
        if err?
          callback(1023)
        else
          if res?
            _.each data.accessGroup, (accessGroupId) ->
              _.each res.accessGroup, (resAccessGroup, index) ->
                if resAccessGroup is accessGroupId
                  res.accessGroup.splice(index, 1)
            res.save (err) ->
              if err?
                callback(1023)
              else
                callback(null)
          else
            callback(1022)
    else
      callback(1024)
    return  


module.exports =
  RequestModule: RequestModule
