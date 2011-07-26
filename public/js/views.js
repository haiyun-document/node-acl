(function() {
  var $content, $defineAccess, $defineAccessGroup, $manageAccess, $manageAccessGroup, $manageRequest, $manageShortlistAccess, $manageShortlistRequest, AccessGroupItemView, AccessItemView, DefineView, FormView, ManageView, RequestItemView, appendItems, changePage, mapLinks, setContentHeight, smallTemplates, startLoad, stopLoad;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.nacl = window.nacl || {};
  window.nacl.templates = window.nacl.templates || {};
  smallTemplates = {
    requestItem: function(locals) {
      return "<img src=\"" + locals.img + "\" class=\"item-thumb\" height=\"36\" width=\"36\">\n<h2 class=\"item-name\">" + locals.name + "</h2>";
    },
    accessItem: function(locals) {
      return "<h2 class=\"item-name\">" + locals.name + "</h2>";
    },
    accessGroupItem: function(locals) {
      return "<h2 class=\"item-name\">" + locals.name + "</h2>";
    }
  };
  _.extend(window.nacl.templates, smallTemplates);
  $content = $('#content');
  $manageRequest = '#manage-items-request';
  $manageAccess = '#manage-items-access';
  $manageAccessGroup = '#manage-items-access-group';
  $manageShortlistRequest = '#manage-shortlist-request';
  $manageShortlistAccess = '#manage-shortlist-access';
  $defineAccess = '#define-items-access';
  $defineAccessGroup = '#define-items-access-group';
  setContentHeight = function() {
    var contentHeight, footerHeight, headerHeight, windowHeight;
    headerHeight = $('#header').outerHeight();
    footerHeight = $('#footer').outerHeight();
    windowHeight = $(window).height();
    contentHeight = windowHeight - headerHeight - footerHeight;
    $('#content, #content>div>section, .shadow').height(contentHeight);
    return $('#manage .col-inner').css({
      'min-height': contentHeight
    });
  };
  setContentHeight();
  $(window).bind('resize', function() {
    return setContentHeight();
  });
  mapLinks = function() {
    return $('a').each(function() {
      if ($(this).attr('href').indexOf('#/') < 0) {
        return $(this).attr('href', '#' + $(this).attr('href'));
      }
    });
  };
  startLoad = function() {
    return $content.addClass('loading');
  };
  stopLoad = function() {
    return $content.removeClass('loading');
  };
  changePage = function(el) {
    startLoad();
    $content.children('div:first').detach();
    $content.append(el);
    stopLoad();
    mapLinks();
    return setContentHeight();
  };
  appendItems = function(el, collection, container, callback) {
    _.each(collection.models, function(model) {
      if ($(el).find(model.view.el).length < 1) {
        if ($(model.view.el).html() === '') {
          model.view.render();
        }
        return $(el).find(container).append(model.view.el);
      }
    });
    return callback();
  };
  $.fn.serializeObject = function() {
    var a, o;
    o = {};
    a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== void 0) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        return o[this.name].push(this.value || "");
      } else {
        return o[this.name] = this.value || "";
      }
    });
    return o;
  };
  RequestItemView = (function() {
    __extends(RequestItemView, Backbone.View);
    function RequestItemView() {
      RequestItemView.__super__.constructor.apply(this, arguments);
    }
    RequestItemView.prototype.tmpl = nacl.templates.requestItem;
    RequestItemView.prototype.tagName = 'article';
    RequestItemView.prototype.className = 'item-request';
    RequestItemView.prototype.events = {
      'click': 'click'
    };
    RequestItemView.prototype.render = function() {
      $(this.el).html(this.tmpl(this.model.toJSON()));
      return $(this.el).draggable({
        revert: 'invalid',
        containment: '#content',
        cursor: 'crosshair',
        zIndex: 3000
      });
    };
    RequestItemView.prototype.click = function(e) {
      return console.log(e.target);
    };
    return RequestItemView;
  })();
  AccessItemView = (function() {
    __extends(AccessItemView, Backbone.View);
    function AccessItemView() {
      AccessItemView.__super__.constructor.apply(this, arguments);
    }
    AccessItemView.prototype.tmpl = nacl.templates.accessItem;
    AccessItemView.prototype.tagName = 'article';
    AccessItemView.prototype.className = 'item-access';
    AccessItemView.prototype.render = function() {
      $(this.el).html(this.tmpl(this.model.toJSON()));
      return $(this.el).draggable({
        revert: 'invalid',
        containment: '#content',
        cursor: 'crosshair',
        zIndex: 3000
      });
    };
    return AccessItemView;
  })();
  AccessGroupItemView = (function() {
    __extends(AccessGroupItemView, Backbone.View);
    function AccessGroupItemView() {
      AccessGroupItemView.__super__.constructor.apply(this, arguments);
    }
    AccessGroupItemView.prototype.tmpl = nacl.templates.accessGroupItem;
    AccessGroupItemView.prototype.tagName = 'article';
    AccessGroupItemView.prototype.className = 'item-access-group';
    AccessGroupItemView.prototype.render = function() {
      $(this.el).html(this.tmpl(this.model.toJSON()));
      return $(this.el).draggable({
        revert: 'invalid',
        containment: '#content',
        cursor: 'crosshair',
        zIndex: 3000
      });
    };
    return AccessGroupItemView;
  })();
  ManageView = (function() {
    __extends(ManageView, Backbone.View);
    function ManageView() {
      ManageView.__super__.constructor.apply(this, arguments);
    }
    ManageView.prototype.tmpl = nacl.templates.manage;
    ManageView.prototype.id = 'manage';
    ManageView.prototype.initialize = function() {
      $(this.el).html($(this.tmpl.call(this)).html());
      return this.render();
    };
    ManageView.prototype.render = function() {
      var self;
      self = this;
      return _.parallel([
        function(callback) {
          return appendItems(self.el, requests, $manageRequest, callback);
        }, function(callback) {
          return appendItems(self.el, accesses, $manageAccess, callback);
        }, function(callback) {
          return appendItems(self.el, accessGroups, $manageAccessGroup, callback);
        }
      ], function(err) {
        $(self.el).find('#manage-selected-request, #manage-items-request').droppable({
          accept: '.item-request',
          activeClass: 'active',
          drop: function(e, ui) {
            $(e.target).append(ui.draggable);
            return $(ui.draggable).css({
              left: 'auto',
              top: 'auto'
            });
          }
        });
        $(self.el).find('#manage-selected-access').droppable({
          accept: '.item-access-group, .item-access',
          activeClass: 'active',
          drop: function(e, ui) {
            $(e.target).append(ui.draggable);
            return $(ui.draggable).css({
              left: 'auto',
              top: 'auto'
            });
          }
        });
        $(self.el).find('#manage-items-access-group').droppable({
          accept: '.item-access-group',
          activeClass: 'active',
          drop: function(e, ui) {
            $(e.target).append(ui.draggable);
            return $(ui.draggable).css({
              left: 'auto',
              top: 'auto'
            });
          }
        });
        $(self.el).find('#manage-items-access').droppable({
          accept: '.item-access',
          activeClass: 'active',
          drop: function(e, ui) {
            $(e.target).append(ui.draggable);
            return $(ui.draggable).css({
              left: 'auto',
              top: 'auto'
            });
          }
        });
        return changePage(self.el);
      });
    };
    return ManageView;
  })();
  DefineView = (function() {
    __extends(DefineView, Backbone.View);
    function DefineView() {
      DefineView.__super__.constructor.apply(this, arguments);
    }
    DefineView.prototype.tmpl = nacl.templates.define;
    DefineView.prototype.id = 'define';
    DefineView.prototype.initialize = function() {
      $(this.el).html($(this.tmpl.call(this)).html());
      return this.render();
    };
    DefineView.prototype.render = function() {
      var self;
      self = this;
      return _.parallel([
        function(callback) {
          return appendItems(self.el, accesses, $defineAccess, callback);
        }, function(callback) {
          return appendItems(self.el, accessGroups, $defineAccessGroup, callback);
        }
      ], function(err) {
        return changePage(self.el);
      });
    };
    return DefineView;
  })();
  FormView = (function() {
    __extends(FormView, Backbone.View);
    function FormView() {
      FormView.__super__.constructor.apply(this, arguments);
    }
    FormView.prototype.tmpl = nacl.templates.form;
    FormView.prototype.locals = {
      title: '',
      name: '',
      slug: '',
      desc: '',
      enable: true
    };
    FormView.prototype.tagName = 'form';
    FormView.prototype.events = {
      'submit': 'submit'
    };
    FormView.prototype.initialize = function() {
      this.setTitle();
      return this.render();
    };
    FormView.prototype.setTitle = function() {
      switch (this.options.action) {
        case 'create':
          this.locals.title = 'Create New';
          break;
        case 'update':
          this.locals.title = 'Update';
      }
      switch (this.options.item) {
        case 'access':
          return this.locals.title += ' Access';
        case 'access-group':
          return this.locals.title += ' Access Group';
      }
    };
    FormView.prototype.render = function() {
      $(this.el).html(this.tmpl.call(this, this.locals));
      return $('#define-info-pane .col-inner').empty().append(this.el);
    };
    FormView.prototype.submit = function(e) {
      var access, attrs;
      attrs = $(this.el).serializeObject();
      switch (this.options.item) {
        case 'access':
          access = accesses.create(attrs);
          console.log(access);
      }
      return e.preventDefault();
    };
    return FormView;
  })();
  window.nacl.views = {
    RequestItemView: RequestItemView,
    AccessItemView: AccessItemView,
    AccessGroupItemView: AccessGroupItemView,
    ManageView: ManageView,
    DefineView: DefineView,
    FormView: FormView
  };
}).call(this);
