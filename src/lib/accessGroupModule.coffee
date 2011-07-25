_ = require('underscore')
{AccessGroup} = require('./models')


class AccessGroupModule

  constructor:(attr, callback) ->
    _.extend(@, attr)



module.exports =
  AccessGroupModule: AccessGroupModule

