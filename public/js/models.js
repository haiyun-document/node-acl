(function() {
  var Access, AccessGroup, AccessGroups, Accesses, Request, Requests;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.nacl = window.nacl || {};
  Request = (function() {
    __extends(Request, Backbone.Model);
    function Request() {
      Request.__super__.constructor.apply(this, arguments);
    }
    Request.prototype.idAttribute = '_id';
    Request.prototype.initialize = function() {
      return this.view = new nacl.views.ItemView({
        model: this,
        tmpl: nacl.templates.requestItem,
        className: 'item-request'
      });
    };
    return Request;
  })();
  Access = (function() {
    __extends(Access, Backbone.Model);
    function Access() {
      Access.__super__.constructor.apply(this, arguments);
    }
    Access.prototype.idAttribute = '_id';
    Access.prototype.initialize = function() {
      return this.view = new nacl.views.ItemView({
        model: this,
        tmpl: nacl.templates.accessItem,
        className: 'item-access'
      });
    };
    return Access;
  })();
  AccessGroup = (function() {
    __extends(AccessGroup, Backbone.Model);
    function AccessGroup() {
      AccessGroup.__super__.constructor.apply(this, arguments);
    }
    AccessGroup.prototype.idAttribute = '_id';
    AccessGroup.prototype.initialize = function() {
      return this.view = new nacl.views.ItemView({
        model: this,
        tmpl: nacl.templates.accessGroupItem,
        className: 'item-access-group'
      });
    };
    return AccessGroup;
  })();
  Requests = (function() {
    __extends(Requests, Backbone.Collection);
    function Requests() {
      Requests.__super__.constructor.apply(this, arguments);
    }
    Requests.prototype.url = '/request';
    Requests.prototype.model = Request;
    Requests.prototype.initialize = function() {
      this.view = new nacl.views.CollectionView({
        collection: this,
        className: 'items items-request'
      });
      return this.fetch();
    };
    return Requests;
  })();
  Accesses = (function() {
    __extends(Accesses, Backbone.Collection);
    function Accesses() {
      Accesses.__super__.constructor.apply(this, arguments);
    }
    Accesses.prototype.url = '/access';
    Accesses.prototype.model = Access;
    Accesses.prototype.initialize = function() {
      this.view = new nacl.views.CollectionView({
        collection: this,
        className: 'items items-access'
      });
      return this.fetch();
    };
    return Accesses;
  })();
  AccessGroups = (function() {
    __extends(AccessGroups, Backbone.Collection);
    function AccessGroups() {
      AccessGroups.__super__.constructor.apply(this, arguments);
    }
    AccessGroups.prototype.url = '/access-group';
    AccessGroups.prototype.model = AccessGroup;
    AccessGroups.prototype.initialize = function() {
      this.view = new nacl.views.CollectionView({
        collection: this,
        className: 'items items-access-group'
      });
      return this.fetch();
    };
    return AccessGroups;
  })();
  nacl.models = {
    Request: Request,
    Access: Access,
    AccessGroup: AccessGroup
  };
  nacl.collections = {
    Requests: Requests,
    Accesses: Accesses,
    AccessGroups: AccessGroups
  };
}).call(this);
