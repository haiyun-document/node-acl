# Helper for get model
getModel = (type, id) ->
  switch type
    when 'access'
      return accesses.get(id)
    when 'access-group'
      return accessGroups.get(id)

refreshCollections = ->
  accesses.view.render()
  accessGroups.view.render()
  requests.view.render()

# Hash routes
class Router extends Backbone.Router
  routes:
    '/': 'manage'
    '/manage': 'manage'
    '/define': 'define'
    '/define/:item/create': 'defineCreate'
    '/define/:item/:id': 'defineViewInfo'
    '/define/:item/:id/update': 'update'
    '/define/:item/:id/delete': 'delete'
  
  gotoParent: (parent) ->
    href = window.location.hash
    @navigate parent, true
    @navigate href
  
  manage: ->
    if @manageView?
      @manageView.render()
    else
      @manageView = new nacl.views.ManageView()
    $('a[href*=manage]').parent().addClass('active').siblings().removeClass('active')

  define: ->
    if @defineView?
      @defineView.render()
    else
      @defineView = new nacl.views.DefineView()
    $('a[href*=define]').parent().addClass('active').siblings().removeClass('active')
    
  defineCreate: (item) ->
    if $('#define').length < 1
      @gotoParent('/define')
    options = 
      item: item
      action: 'create'
      page: 'define'
    new nacl.views.FormView(options)
    
  defineViewInfo: (item, id) ->
    if $('#define').length < 1
      @gotoParent('/define')
    m = getModel(item, id)
    m.infoView.render()
    
  update: (item, id) ->
    if $('#define').length < 1
      @gotoParent('/define')
    options = 
      item: item
      action: 'update'
      page: 'define'
    _.extend(options, getModel(item,id).toJSON())
    new nacl.views.FormView(options)
    
  delete: (item, id) ->
    m = getModel(item,id)
    $el = $(m.view.el)
    self = @
    m.destroy 
      success: (res, model) ->
        $el.remove()
        self.navigate '/define'
        $.meow message: 'Item deleted successfully!'
      error: (res, model) ->
        $.meow message: 'Error deleting item:' + res

# Document ready initialization
$ ->
  # Initialize routes
  window.app = new Router()
  Backbone.history.start()
  
  # Redirect to hashes
  if window.location.href.indexOf('#/') < 0
    window.location.href = "#{window.location.protocol}//#{window.location.host}##{window.location.pathname}"
  
  