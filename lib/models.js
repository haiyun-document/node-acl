(function() {
  var AccessGroupSchema, AccessSchema, EmbedAccess, ObjectId, RequestSchema, Schema, app, conf, mongoose;
  mongoose = require('mongoose');
  app = require('../app');
  conf = require('./conf');
  if (module.parent.parent.parent.id.indexOf('test.js') > 0) {
    app.configure(function() {
      return app.use(mongoose.connect(conf.testDb));
    });
  } else {
    app.configure(function() {
      return app.use(mongoose.connect(conf.db));
    });
  }
  Schema = mongoose.Schema;
  ObjectId = Schema.ObjectId;
  AccessSchema = new Schema({
    slug: String,
    name: String,
    desc: String,
    enable: Boolean,
    createdAt: {
      type: Date,
      "default": new Date()
    }
  });
  EmbedAccess = new Schema({
    _id: ObjectId,
    slug: String,
    perm: String
  });
  AccessGroupSchema = new Schema({
    slug: String,
    name: String,
    desc: String,
    access: [EmbedAccess],
    createdAt: {
      type: Date,
      "default": new Date()
    }
  });
  RequestSchema = new Schema({
    _id: ObjectId,
    name: String,
    type: String,
    access: Array,
    accessGroup: Array,
    createdAt: {
      type: Date,
      "default": new Date()
    }
  });
  mongoose.model('Access', AccessSchema);
  mongoose.model('AccessGroup', AccessGroupSchema);
  mongoose.model('Request', RequestSchema);
  module.exports.Access = mongoose.model('Access');
  module.exports.AccessGroup = mongoose.model('AccessGroup');
  module.exports.Request = mongoose.model('Request');
}).call(this);
