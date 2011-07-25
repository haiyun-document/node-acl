class Request extends Backbone.Model
  initialize: ->
    
class Access extends Backbone.Model
  initialize: ->
    
class AccessGroup extends Backbone.Model
  initialize: ->
    
class Requests extends Backbone.Collection
  initialize: ->
    
class Accesses extends Backbone.Collection
  initialize: ->
    
class AccessGroups extends Backbone.Collection
  initialize: ->
    

window.nacl = window.nacl || {}

nacl.models = 
  Request: Request
  Access: Access
  AccessGroup: AccessGroup

nacl.collections = 
  Requests: Requests
  Accesses: Accesses
  AccessGroups: AccessGroups