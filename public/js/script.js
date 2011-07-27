(function() {
  var Router, getModel;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  getModel = function(type, id) {
    switch (type) {
      case 'access':
        return accesses.get(id);
      case 'access-group':
        return accessGroups.get(id);
    }
  };
  Router = (function() {
    __extends(Router, Backbone.Router);
    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }
    Router.prototype.routes = {
      '/': 'manage',
      '/manage': 'manage',
      '/define': 'define',
      '/define/:item/create': 'defineCreate',
      '/define/:item/:id': 'defineViewInfo',
      '/define/:item/:id/update': 'defineUpdate'
    };
    Router.prototype.gotoParent = function(parent) {
      var href;
      href = window.location.hash;
      this.navigate(parent, true);
      return this.navigate(href);
    };
    Router.prototype.manage = function() {
      if (this.manageView != null) {
        this.manageView.render();
      } else {
        this.manageView = new nacl.views.ManageView();
      }
      return $('a[href*=manage]').parent().addClass('active').siblings().removeClass('active');
    };
    Router.prototype.define = function() {
      if (this.defineView != null) {
        this.defineView.render();
      } else {
        this.defineView = new nacl.views.DefineView();
      }
      return $('a[href*=define]').parent().addClass('active').siblings().removeClass('active');
    };
    Router.prototype.defineCreate = function(item) {
      var options;
      if ($('#define').length < 1) {
        this.gotoParent('/define');
      }
      options = {
        item: item,
        action: 'create',
        page: 'define'
      };
      return new nacl.views.FormView(options);
    };
    Router.prototype.defineViewInfo = function(item, id) {
      var m;
      if ($('#define').length < 1) {
        this.gotoParent('/define');
      }
      m = getModel(item, id);
      return m.infoView.render();
    };
    Router.prototype.defineUpdate = function(item, id) {
      var options;
      if ($('#define').length < 1) {
        this.gotoParent('/define');
      }
      options = {
        item: item,
        action: 'update',
        page: 'define'
      };
      _.extend(options, getModel(item, id).toJSON());
      return new nacl.views.FormView(options);
    };
    return Router;
  })();
  $(function() {
    window.app = new Router();
    Backbone.history.start();
    if (window.location.href.indexOf('#/') < 0) {
      return window.location.href = "" + window.location.protocol + "//" + window.location.host + "#" + window.location.pathname;
    }
  });
}).call(this);
