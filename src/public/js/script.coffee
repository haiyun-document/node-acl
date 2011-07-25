setContentHeight = ->
  headerHeight = $('#header').outerHeight()
  footerHeight = $('#footer').outerHeight()
  windowHeight = $(window).height()
  
  contentHeight = windowHeight - headerHeight - footerHeight
  
  $('#content, #manage>section, .shadow').height(contentHeight)
  $('.col-inner').css({'min-height': contentHeight})
  
$ ->
  setContentHeight()
  $(window).bind 'resize', -> setContentHeight()