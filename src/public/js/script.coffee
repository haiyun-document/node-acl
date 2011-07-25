setContentHeight = ->
  headerHeight = $('#header').outerHeight()
  footerHeight = $('#footer').outerHeight()
  windowHeight = $(window).height()
  
  contentHeight = windowHeight - headerHeight - footerHeight
  
  $('#content, #content>div>section, .shadow').height(contentHeight)
  $('#manage .col-inner').css({'min-height': contentHeight})
  
$ ->
  setContentHeight()
  $(window).bind 'resize', -> setContentHeight()