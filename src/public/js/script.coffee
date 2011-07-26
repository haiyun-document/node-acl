# Hash routes
class Router extends Backbone.Router
  routes:
    '/': 'manage'
    '/manage': 'manage'
    '/define': 'define'
  
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

# Document ready initialization
$ ->
  # Initialize routes
  new Router()
  Backbone.history.start()
  
  # Redirect to hashes
  if window.location.href.indexOf('#/') < 0
    window.location.href = "#{window.location.protocol}//#{window.location.host}##{window.location.pathname}"
  
  # Adds hashes to all links
  $('nav a').each ->
    if $(@).attr('href').indexOf('#/') < 0 
      $(@).attr('href', '#' + $(@).attr('href')) 