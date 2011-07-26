# Hash routes
class Router extends Backbone.Router
  routes:
    '/': 'manage'
    '/manage': 'manage'
    '/define': 'define'
    '/define/:item/create': 'defineCreate'
  
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

# Document ready initialization
$ ->
  # Initialize routes
  new Router()
  Backbone.history.start()
  
  # Redirect to hashes
  if window.location.href.indexOf('#/') < 0
    window.location.href = "#{window.location.protocol}//#{window.location.host}##{window.location.pathname}"
  
  