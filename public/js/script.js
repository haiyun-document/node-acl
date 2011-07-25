(function() {
  var setContentHeight;
  setContentHeight = function() {
    var contentHeight, footerHeight, headerHeight, windowHeight;
    headerHeight = $('#header').outerHeight();
    footerHeight = $('#footer').outerHeight();
    windowHeight = $(window).height();
    contentHeight = windowHeight - headerHeight - footerHeight;
    $('#content, #manage>section').height(contentHeight);
    return $('.col-inner').css({
      'min-height': contentHeight
    });
  };
  $(function() {
    setContentHeight();
    return $(window).bind('resize', function() {
      return setContentHeight();
    });
  });
}).call(this);
