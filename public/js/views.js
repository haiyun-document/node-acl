(function() {
  var $content, CollectionView, DefineView, FormView, InfoView, ItemView, ManageView, appendItems, changePage, defineAccess, defineAccessGroup, getModel, manageAccess, manageAccessGroup, manageRequest, manageShortlistAccess, manageShortlistRequest, mapLinks, setContentHeight, smallTemplates, startLoad, stopLoad;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.nacl = window.nacl || {};
  getModel = function(type, id) {
    switch (type) {
      case 'access':
        return accesses.get(id);
      case 'access-group':
        return accessGroups.get(id);
    }
  };
  window.nacl.templates = window.nacl.templates || {};
  smallTemplates = {
    requestItem: function(locals) {
      return "<img src=\"" + locals.img + "\" class=\"item-thumb\" height=\"36\" width=\"36\">\n<h2 class=\"item-name\">" + locals.name + "</h2>";
    },
    accessItem: function(locals) {
      return "<h2 class=\"item-name\">" + locals.name + "</h2>";
    }
  };
  _.extend(window.nacl.templates, smallTemplates);
  $content = $('#content');
  manageRequest = '#manage-items-request';
  manageAccess = '#manage-items-access';
  manageAccessGroup = '#manage-items-access-group';
  manageShortlistRequest = '#manage-shortlist-request';
  manageShortlistAccess = '#manage-shortlist-access';
  defineAccess = '#define-items-access';
  defineAccessGroup = '#define-items-access-group';
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
  ItemView = (function() {
    __extends(ItemView, Backbone.View);
    function ItemView() {
      ItemView.__super__.constructor.apply(this, arguments);
    }
    ItemView.prototype.tagName = 'article';
    ItemView.prototype.events = {
      'click': 'renderInfoView'
    };
    ItemView.prototype.render = function() {
      $(this.el).data('slug', this.model.get('slug'));
      $(this.el).data('id', this.model.get('_id'));
      $(this.el).html(this.options.tmpl(this.model.toJSON()));
      return $(this.el).draggable({
        revert: 'invalid',
        containment: '#content',
        cursor: 'crosshair',
        zIndex: 3000
      });
    };
    ItemView.prototype.renderInfoView = function() {
      var id, type;
      type = this.model.get('type');
      id = this.model.get('_id');
      return app.navigate("/define/" + type + "/" + id, true);
    };
    return ItemView;
  })();
  CollectionView = (function() {
    __extends(CollectionView, Backbone.View);
    function CollectionView() {
      CollectionView.__super__.constructor.apply(this, arguments);
    }
    CollectionView.prototype.render = function() {
      var self;
      self = this;
      return _.each(this.collection.models, function(model) {
        if ($(this.el).find(model.view.el).length < 1) {
          if ($(model.view.el).html() === '') {
            model.view.render();
          }
          return $(self.el).append(model.view.el);
        }
      });
    };
    return CollectionView;
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
          requests.view.render();
          $(self.el).find(manageRequest).append(requests.view.el);
          return callback();
        }, function(callback) {
          accesses.view.render();
          $(self.el).find(manageAccess).append(accesses.view.el);
          return callback();
        }, function(callback) {
          accessGroups.view.render();
          $(self.el).find(manageAccessGroup).append(accessGroups.view.el);
          return callback();
        }
      ], function(err) {
        var dropCallback;
        dropCallback = function(e, ui) {
          $(e.target).append(ui.draggable);
          return $(ui.draggable).css({
            left: 'auto',
            top: 'auto'
          });
        };
        $(self.el).find('#manage-selected-request .items, #manage-items-request .items').droppable({
          accept: '.item-request',
          activeClass: 'active',
          drop: dropCallback
        });
        $(self.el).find('#manage-selected-access .items').droppable({
          accept: '.item-access-group, .item-access',
          activeClass: 'active',
          drop: dropCallback
        });
        $(self.el).find('#manage-items-access-group .items').droppable({
          accept: '.item-access-group',
          activeClass: 'active',
          drop: dropCallback
        });
        $(self.el).find('#manage-items-access .items').droppable({
          accept: '.item-access',
          activeClass: 'active',
          drop: dropCallback
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
          accesses.view.render();
          return callback();
        }, function(callback) {
          accessGroups.view.render();
          return callback();
        }
      ], function(err) {
        $(self.el).find('.item-access-group').droppable({
          accept: '.item-access',
          activeClass: 'active',
          drop: function(e, ui) {
            return console.log(ui);
          }
        });
        $(self.el).find(defineAccess).append(accesses.view.el);
        $(self.el).find(defineAccessGroup).append(accessGroups.view.el);
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
      enable: 'on'
    };
    FormView.prototype.tagName = 'form';
    FormView.prototype.className = 'define-form';
    FormView.prototype.events = {
      'submit': 'submit'
    };
    FormView.prototype.initialize = function() {
      _.extend(this.locals, this.options);
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
      switch (this.options.action) {
        case 'create':
          this.submitCreate();
          break;
        case 'update':
          this.submitUpdate();
      }
      return e.preventDefault();
    };
    FormView.prototype.submitCreate = function() {
      var attrs;
      attrs = $(this.el).serializeObject();
      attrs.enable = attrs.enable || false;
      switch (this.options.item) {
        case 'access':
          return accesses.create(attrs, {
            success: function(model, response) {
              accesses.view.render();
              $(defineAccess).append(accesses.view.el);
              return $.meow({
                message: 'Access created successfully!'
              });
            },
            error: function(model, response) {
              return $.meow({
                message: 'Error creating access:' + response
              });
            }
          });
        case 'access-group':
          return accessGroups.create(attrs, {
            success: function(model, response) {
              accessGroups.view.render();
              $(defineAccessGroup).append(accessGroups.view.el);
              return $.meow({
                message: 'Access group created successfully!'
              });
            },
            error: function(model, response) {
              $.meow({
                message: 'Error creating access group:' + response
              });
              return alert();
            }
          });
      }
    };
    FormView.prototype.submitUpdate = function() {
      var attrs, m;
      attrs = $(this.el).serializeObject();
      m = getModel(this.options.item, this.options._id);
      attrs.enable = attrs.enable || false;
      return m.save(attrs, {
        success: function(model, response) {
          m.view.render();
          app.navigate("/define/" + (m.get('type')) + "/" + (m.get('_id')), true);
          return $.meow({
            message: 'Access updated successfully!'
          });
        },
        error: function(model, response) {
          return $.meow({
            message: 'Error creating access group:' + response
          });
        }
      });
    };
    return FormView;
  })();
  InfoView = (function() {
    __extends(InfoView, Backbone.View);
    function InfoView() {
      InfoView.__super__.constructor.apply(this, arguments);
    }
    InfoView.prototype.tmpl = nacl.templates.info;
    InfoView.prototype.className = "access-info";
    InfoView.prototype.events = {
      'click #define-edit-access': 'edit'
    };
    InfoView.prototype.render = function() {
      $(this.el).html(this.tmpl.call(this, this.model.toJSON()));
      return $('#define-info-pane .col-inner').empty().append(this.el);
    };
    InfoView.prototype.edit = function() {};
    return InfoView;
  })();
  window.nacl.views = {
    ItemView: ItemView,
    CollectionView: CollectionView,
    ManageView: ManageView,
    DefineView: DefineView,
    FormView: FormView,
    InfoView: InfoView
  };
}).call(this);
