# Safety wrapper
window.nacl = window.nacl || {}

# Models
class Request extends Backbone.Model
  idAttribute: '_id'
  initialize: ->
    @view = new nacl.views.ItemView
      model: @
      tmpl: nacl.templates.requestItem
      className: 'item-request'

class Access extends Backbone.Model
  idAttribute: '_id'
  initialize: ->
    @view = new nacl.views.ItemView
      model: @
      tmpl: nacl.templates.accessItem
      className: 'item-access'
    
class AccessGroup extends Backbone.Model
  idAttribute: '_id'
  initialize: ->
    @view = new nacl.views.ItemView
      model: @
      tmpl: nacl.templates.accessGroupItem
      className: 'item-access-group'

    
# Collections
class Requests extends Backbone.Collection
  url: '/request'
  model: Request
  initialize: ->
    @view = new nacl.views.CollectionView({
      collection: @
      className: 'items items-request'
    })
    
    @fetch()
    
class Accesses extends Backbone.Collection
  url: '/access'
  model: Access
  initialize: ->
    @view = new nacl.views.CollectionView({
      collection: @
      className: 'items items-access'
    })
    
    @fetch()
    
class AccessGroups extends Backbone.Collection
  url: '/access-group'
  model: AccessGroup
  initialize: ->
    @view = new nacl.views.CollectionView({
      collection: @
      className: 'items items-access-group'
    })
    
    @fetch()

nacl.models = 
  Request: Request
  Access: Access
  AccessGroup: AccessGroup

nacl.collections = 
  Requests: Requests
  Accesses: Accesses
  AccessGroups: AccessGroups