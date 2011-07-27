# Safety wrapper
window.nacl = window.nacl || {}

# Models
class Request extends Backbone.Model
  idAttribute: '_id'
  defaults: 
    type: 'request'
  initialize: ->
    @view = new nacl.views.ItemView
      model: @
      tmpl: nacl.templates.requestItem
      className: 'item-request'
    @infoView = new nacl.views.InfoView({model: @})

class Access extends Backbone.Model
  idAttribute: '_id'
  defaults: 
    type: 'access'
  initialize: ->
    @view = new nacl.views.ItemView
      model: @
      tmpl: nacl.templates.accessItem
      className: 'item-access'
    @infoView = new nacl.views.InfoView({model: @})
    
class AccessGroup extends Backbone.Model
  idAttribute: '_id'
  defaults: 
    type: 'access-group'
  initialize: ->
    @view = new nacl.views.ItemView
      model: @
      tmpl: nacl.templates.accessItem
      className: 'item-access-group'
    @infoView = new nacl.views.InfoView({model: @})

    
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