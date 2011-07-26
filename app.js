(function() {
  var app, express, mockData, nacl, nodeAcl;
  express = require("express");
  app = module.exports = express.createServer();
  mockData = require('./lib/mockData');
  nodeAcl = require("./lib/nodeAcl");
  nacl = new nodeAcl.NodeAcl();
  app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express.static(__dirname + "/public"));
  });
  app.configure("development", function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  app.configure("production", function() {
    return app.use(express.errorHandler());
  });
  app.helpers({
    title: "node-acl"
  });
  app.get("/", function(req, res) {
    return res.render("manage");
  });
  app.get("/manage", function(req, res) {
    return res.render("manage");
  });
  app.get("/define", function(req, res) {
    return res.render("define");
  });
  app.get("/request", function(req, res) {
    return res.send(mockData.getRequests);
  });
  app.get("/access", function(req, res) {
    return nacl.readAccess({}, function(err, result) {
      return res.send(result);
    });
  });
  app.get("/access/:slug", function(req, res) {
    var data;
    data = {
      slug: req.params.slug
    };
    return nacl.readAccess(data, function(err, result) {
      return res.send(result);
    });
  });
  app.post("/access", function(req, res) {
    var data;
    data = req.body;
    return nacl.createAccess(data, function(err, result) {
      return res.send(result);
    });
  });
  app.put("/access/:slug", function(req, res) {
    var data;
    data = req.body;
    data.slug = req.params.slug;
    return nacl.updateAccess(data, function(err, result) {
      return res.send(result);
    });
  });
  app.del("/access/:slug", function(req, res) {
    var data;
    data = req.body;
    data.slug = req.params.slug;
    return nacl.deleteAccess(data, function(err, result) {
      return res.send(result);
    });
  });
  app.get("/access-group", function(req, res) {
    return res.send(mockData.getAccessGroups);
  });
  app.listen(3000);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}).call(this);
