(function() {
  var Router;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Router = (function() {
    __extends(Router, Backbone.Router);
    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }
    Router.prototype.routes = {
      '/': 'manage',
      '/manage': 'manage',
      '/define': 'define'
    };
    Router.prototype.manage = function() {
      if (this.manageView != null) {
        return this.manageView.render();
      } else {
        return this.manageView = new nacl.views.ManageView();
      }
    };
    Router.prototype.define = function() {
      if (this.defineView != null) {
        return this.defineView.render();
      } else {
        return this.defineView = new nacl.views.DefineView();
      }
    };
    return Router;
  })();
  $(function() {
    new Router();
    Backbone.history.start();
    if (window.location.href.indexOf('#/') < 0) {
      window.location.href = "" + window.location.protocol + "//" + window.location.host + "#" + window.location.pathname;
    }
    return $('nav a').each(function() {
      if ($(this).attr('href').indexOf('#/') < 0) {
        return $(this).attr('href', '#' + $(this).attr('href'));
      }
    });
  });
}).call(this);
