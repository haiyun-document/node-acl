(function() {
  var addAccess, assert, getAllAccess, getOneAccess, testAccessAdd, testAccessEdit, testAccessGet, vows;
  vows = require('vows');
  assert = require('assert');
  testAccessGet = vows.describe('Access: access.get()');
  getAllAccess = {
    'GIVEN a access.get() request': {
      topic: function() {
        return this.callback(null, 'function not ready');
      },
      'SHOULD have no error': function(err, res) {
        return assert.isNull(err);
      },
      'SHOULD be an array of all access objects': function(err, res) {
        return assert.isArray(res);
      },
      'EACH access object should contain slug': function(err, res) {
        return assert.include(res[0], 'slug');
      },
      'EACH access object should contain enabled state': function(err, res) {
        return assert.include(res[0], 'allow');
      }
    }
  };
  getOneAccess = {
    "GIVEN a access.get('slug_string') request": {
      topic: function() {
        return this.callback(null, 'function not ready');
      },
      'SHOULD have no error': function(err, res) {
        return assert.isNull(err);
      },
      'SHOULD be an objects': function(err, res) {
        return assert.isObject(res);
      },
      'SHOULD should contain slug': function(err, res) {
        return assert.include(res, 'slug');
      },
      'SHOULD contain enabled state': function(err, res) {
        return assert.include(res, 'allow');
      }
    }
  };
  testAccessAdd = vows.describe('Access: access.add()');
  addAccess = {
    'GIVEN a access.add({slug: String, allow: Boolean}) request': {
      topic: function() {
        return this.callback(null, 'function not ready');
      },
      'SHOULD have no error': function(err, res) {
        return assert.isNull(err);
      },
      "SHOULD return 'success'": function(err, res) {
        return assert.isArray(res);
      }
    }
  };
  testAccessEdit = vows.describe('Access: access.edit()');
  addAccess = {
    'GIVEN a access.add({slug: String, allow: Boolean}) request': {
      topic: function() {
        return this.callback(null, 'function not ready');
      },
      'SHOULD have no error': function(err, res) {
        return assert.isNull(err);
      },
      "SHOULD return 'success'": function(err, res) {
        return assert.isArray(res);
      }
    }
  };
  testAccessGet.addBatch(getAllAccess).addBatch(getOneAccess)["export"](module);
  testAccessAdd.addBatch(addAccess)["export"](module);
}).call(this);
