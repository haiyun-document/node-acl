# Safety wrapper
window.nacl = window.nacl || {}

# Models
class Request extends Backbone.Model
  initialize: ->
    @view = new nacl.views.RequestItemView({model: @})
    
class Access extends Backbone.Model
  initialize: ->
    @view = new nacl.views.AccessItemView({model: @})
    
class AccessGroup extends Backbone.Model
  initialize: ->
    @view = new nacl.views.AccessGroupItemView({model: @})

# Collections
class Requests extends Backbone.Collection
  url: '/request'
  model: Request
  initialize: ->
    @fetch()
    
class Accesses extends Backbone.Collection
  url: '/access'
  model: Access
  initialize: ->
    @fetch()
    
class AccessGroups extends Backbone.Collection
  url: '/access-group'
  model: AccessGroup
  initialize: ->
    @fetch()

nacl.models = 
  Request: Request
  Access: Access
  AccessGroup: AccessGroup

nacl.collections = 
  Requests: Requests
  Accesses: Accesses
  AccessGroups: AccessGroups