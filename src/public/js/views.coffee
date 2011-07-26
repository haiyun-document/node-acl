# Safety wrapper
window.nacl = window.nacl || {}

# Additional small templates
window.nacl.templates = window.nacl.templates || {}
smallTemplates =
  requestItem : (locals) ->
    """
      <img src="#{locals.img}" class="item-thumb" height="36" width="36">
      <h2 class="item-name">#{locals.name}</h2>
    """
  accessItem : (locals) ->
    """
      <h2 class="item-name">#{locals.name}</h2>
    """
  accessGroupItem : (locals) ->
    """
      <h2 class="item-name">#{locals.name}</h2>
    """
    
_.extend(window.nacl.templates, smallTemplates)    

# View variables
$content = $('#content')

$manageRequest = '#manage-items-request'
$manageAccess = '#manage-items-access'
$manageAccessGroup = '#manage-items-access-group'
$manageShortlistRequest = '#manage-shortlist-request'
$manageShortlistAccess = '#manage-shortlist-access'

$defineAccess = '#define-items-access'
$defineAccessGroup = '#define-items-access-group'

# Resize content height
setContentHeight = ->
  headerHeight = $('#header').outerHeight()
  footerHeight = $('#footer').outerHeight()
  windowHeight = $(window).height()

  contentHeight = windowHeight - headerHeight - footerHeight

  $('#content, #content>div>section, .shadow').height(contentHeight)
  $('#manage .col-inner').css({'min-height': contentHeight})

setContentHeight()
$(window).bind 'resize', -> setContentHeight()

# Adds hashes to all links
mapLinks = ->
  $('a').each ->
    if $(@).attr('href').indexOf('#/') < 0 
      $(@).attr('href', '#' + $(@).attr('href'))

# Start/stop loading
startLoad = ->
  $content.addClass('loading')
stopLoad = ->
  $content.removeClass('loading')
  
changePage = (el) ->
  startLoad()
  $content.children('div:first').detach()
  $content.append(el)
  stopLoad()
  mapLinks()
  setContentHeight()

# Append item to page
appendItems = (el, collection, container, callback) ->
  _.each collection.models, (model) ->
    if $(el).find(model.view.el).length < 1
      if $(model.view.el).html() is '' 
        model.view.render()
      $(el).find(container).append(model.view.el)
  callback()

# Serialize form plugin
$.fn.serializeObject = ->
  o = {}
  a = @serializeArray()
  $.each a, ->
    if o[@name] != undefined
      o[@name] = [ o[@name] ]  unless o[@name].push
      o[@name].push @value or ""
    else
      o[@name] = @value or ""
  o


# Individual item views
class RequestItemView extends Backbone.View
  tmpl: nacl.templates.requestItem
  tagName: 'article'
  className: 'item-request'
  events:
    'click' : 'click'
  render: ->
    $(@el).html(@tmpl(@model.toJSON()))
    
    $(@el).draggable
      revert: 'invalid'
      containment: '#content'
      cursor: 'crosshair'
      zIndex: 3000
      
      
  click: (e) ->
    console.log e.target
  
class AccessItemView extends Backbone.View
  tmpl: nacl.templates.accessItem
  tagName: 'article'
  className: 'item-access'
  render: ->
    $(@el).html(@tmpl(@model.toJSON()))
    
    $(@el).draggable
      revert: 'invalid'
      containment: '#content'
      cursor: 'crosshair'
      zIndex: 3000
  
class AccessGroupItemView extends Backbone.View
  tmpl: nacl.templates.accessGroupItem
  tagName: 'article'
  className: 'item-access-group'
  render: ->
    $(@el).html(@tmpl(@model.toJSON()))
    
    $(@el).draggable
      revert: 'invalid'
      containment: '#content'
      cursor: 'crosshair'
      zIndex: 3000

# Pages views
class ManageView extends Backbone.View
  tmpl : nacl.templates.manage
  id: 'manage'
  initialize: ->
    $(@el).html($(@tmpl.call(@)).html())
    @render()
    
  render: ->
    self = @
    _.parallel [
      (callback) -> appendItems(self.el, requests, $manageRequest, callback)
      (callback) -> appendItems(self.el, accesses, $manageAccess, callback)
      (callback) -> appendItems(self.el, accessGroups, $manageAccessGroup, callback)
    ]
    , (err) ->
      $(self.el).find('#manage-selected-request, #manage-items-request').droppable
        accept: '.item-request'
        activeClass: 'active'
        drop: (e, ui) ->
          $(e.target).append(ui.draggable)
          $(ui.draggable).css({left: 'auto', top: 'auto'})
      
      $(self.el).find('#manage-selected-access').droppable
        accept: '.item-access-group, .item-access'
        activeClass: 'active'
        drop: (e, ui) ->
          $(e.target).append(ui.draggable)
          $(ui.draggable).css({left: 'auto', top: 'auto'})
      
      $(self.el).find('#manage-items-access-group').droppable
        accept: '.item-access-group'
        activeClass: 'active'
        drop: (e, ui) ->
          $(e.target).append(ui.draggable)
          $(ui.draggable).css({left: 'auto', top: 'auto'})
      
      $(self.el).find('#manage-items-access').droppable
        accept: '.item-access'
        activeClass: 'active'
        drop: (e, ui) ->
          $(e.target).append(ui.draggable)
          $(ui.draggable).css({left: 'auto', top: 'auto'})
      
      changePage(self.el)
    
class DefineView extends Backbone.View
  tmpl: nacl.templates.define
  id: 'define'
  initialize: ->
    $(@el).html($(@tmpl.call(@)).html())
    @render()
    
  render: ->
    self = @
    _.parallel [
      (callback) -> appendItems(self.el, accesses, $defineAccess, callback)
      (callback) -> appendItems(self.el, accessGroups, $defineAccessGroup, callback)
    ]
    , (err) ->
      changePage(self.el)

class FormView extends Backbone.View
  tmpl: nacl.templates.form
  locals: 
    title: ''
    name: ''
    slug: ''
    desc: ''
    enable: true
  tagName: 'form'
  events: 
    'submit': 'submit'
  initialize: ->
    @setTitle()
    @render()
  setTitle: ->
    switch @options.action
      when 'create' then @locals.title = 'Create New'
      when 'update' then @locals.title = 'Update'
    switch @options.item
      when 'access' then @locals.title += ' Access'
      when 'access-group' then @locals.title += ' Access Group'
  render: ->
    $(@el).html(@tmpl.call(@, @locals))
    $('#define-info-pane .col-inner').empty().append(@el)
    
  submit: (e) ->
    attrs = $(@el).serializeObject()
    switch @options.item
      when 'access'
        access = accesses.create attrs
        console.log access
      
      
    e.preventDefault()
    
# Exports module
window.nacl.views = 
  RequestItemView: RequestItemView
  AccessItemView: AccessItemView
  AccessGroupItemView: AccessGroupItemView
  ManageView: ManageView
  DefineView: DefineView
  FormView: FormView