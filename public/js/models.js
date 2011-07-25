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
  Request = (function() {
    __extends(Request, Backbone.Model);
    function Request() {
      Request.__super__.constructor.apply(this, arguments);
    }
    Request.prototype.initialize = function() {};
    return Request;
  })();
  Access = (function() {
    __extends(Access, Backbone.Model);
    function Access() {
      Access.__super__.constructor.apply(this, arguments);
    }
    Access.prototype.initialize = function() {};
    return Access;
  })();
  AccessGroup = (function() {
    __extends(AccessGroup, Backbone.Model);
    function AccessGroup() {
      AccessGroup.__super__.constructor.apply(this, arguments);
    }
    AccessGroup.prototype.initialize = function() {};
    return AccessGroup;
  })();
  Requests = (function() {
    __extends(Requests, Backbone.Collection);
    function Requests() {
      Requests.__super__.constructor.apply(this, arguments);
    }
    Requests.prototype.initialize = function() {};
    return Requests;
  })();
  Accesses = (function() {
    __extends(Accesses, Backbone.Collection);
    function Accesses() {
      Accesses.__super__.constructor.apply(this, arguments);
    }
    Accesses.prototype.initialize = function() {};
    return Accesses;
  })();
  AccessGroups = (function() {
    __extends(AccessGroups, Backbone.Collection);
    function AccessGroups() {
      AccessGroups.__super__.constructor.apply(this, arguments);
    }
    AccessGroups.prototype.initialize = function() {};
    return AccessGroups;
  })();
  window.nacl = window.nacl || {};
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
