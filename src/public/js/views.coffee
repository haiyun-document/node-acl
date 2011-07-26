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

manageRequest = '#manage-items-request'
manageAccess = '#manage-items-access'
manageAccessGroup = '#manage-items-access-group'
manageShortlistRequest = '#manage-shortlist-request'
manageShortlistAccess = '#manage-shortlist-access'

defineAccess = '#define-items-access'
defineAccessGroup = '#define-items-access-group'

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
class ItemView extends Backbone.View
  tagName: 'article'
  render: ->
    $(@el).data('slug', @model.get('slug'))
    $(@el).html(@options.tmpl(@model.toJSON()))
    $(@el).draggable
      revert: 'invalid'
      containment: '#content'
      cursor: 'crosshair'
      zIndex: 3000

class CollectionView extends Backbone.View
  render: ->
    self = @
    _.each @collection.models, (model) ->
      if $(@el).find(model.view.el).length < 1
        if $(model.view.el).html() is '' 
          model.view.render()
        $(self.el).append(model.view.el)
        
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
      (callback) -> 
        requests.view.render()
        $(self.el).find(manageRequest).append(requests.view.el)
        callback()
      (callback) ->   
        accesses.view.render()
        $(self.el).find(manageAccess).append(accesses.view.el)
        callback()
      (callback) -> 
        accessGroups.view.render()
        $(self.el).find(manageAccessGroup).append(accessGroups.view.el)
        callback()
    ]
    , (err) ->
      $(self.el).find('#manage-selected-request .items, #manage-items-request .items').droppable
        accept: '.item-request'
        activeClass: 'active'
        drop: (e, ui) ->
          $(e.target).append(ui.draggable)
          $(ui.draggable).css({left: 'auto', top: 'auto'})
      
      $(self.el).find('#manage-selected-access .items').droppable
        accept: '.item-access-group, .item-access'
        activeClass: 'active'
        drop: (e, ui) ->
          $(e.target).append(ui.draggable)
          $(ui.draggable).css({left: 'auto', top: 'auto'})
      
      $(self.el).find('#manage-items-access-group .items').droppable
        accept: '.item-access-group'
        activeClass: 'active'
        drop: (e, ui) ->
          $(e.target).append(ui.draggable)
          $(ui.draggable).css({left: 'auto', top: 'auto'})
      
      $(self.el).find('#manage-items-access .items').droppable
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
      (callback) -> 
        accesses.view.render()        
        callback()
      (callback) -> 
        accessGroups.view.render()
        callback()
    ]
    , (err) ->
      $(self.el).find('#define-delete').droppable
        accept: '.item-access-group, .item-access'
        activeClass: 'active'
        drop: (e, ui) ->
          if $(ui.draggable[0]).hasClass('item-access-group') > 0
            delUrl = '/access-group'
          else if $(ui.draggable[0]).hasClass('item-access') > 0
            delUrl = '/access'
          
          $.ajax
            type: 'DEL'
            url: delUrl + '/' + $(ui.draggable[0]).data('slug')
            success: (data) ->
              alert('Item successfully deleted!')
      
      $(self.el).find(defineAccess).append(accesses.view.el)
      $(self.el).find(defineAccessGroup).append(accessGroups.view.el)
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
  className: 'define-form'
  events: 
    'submit': 'submit'
  initialize: ->
    _.extend(@locals, @options)
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
        a = accesses.create attrs,
          success: (model, response) ->
            alert('Access created successfully!')
            accesses.view.render()
            $(defineAccess).append(accesses.view.el)
          error: (model, response) ->
            alert('Error creating access:' + response)
            
      when 'access-group'
        ag = accessGroups.create attrs,
          success: (model, response) ->
            alert('Access group created successfully!')
            accessGroups.view.render()
            $(defineAccessGroup).append(accessGroups.view.el)
          error: (model, response) ->
            alert('Error creating access group:' + response)
      
    e.preventDefault()
    
# Exports module
window.nacl.views = 
  ItemView: ItemView
  CollectionView: CollectionView
  ManageView: ManageView
  DefineView: DefineView
  FormView: FormView