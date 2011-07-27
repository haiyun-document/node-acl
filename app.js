(function() {
  var app, express, mockData, nodeAcl;
  express = require("express");
  app = module.exports = express.createServer();
  mockData = require('./lib/mockData');
  nodeAcl = require("./lib/nodeAcl");
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
    return nodeAcl.readAccess({}, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    });
  });
  app.get("/access/:id", function(req, res) {
    var data;
    data = {
      slug: req.params.slug
    };
    return nodeAcl.readAccess(data, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    });
  });
  app.post("/access", function(req, res) {
    var data;
    data = req.body;
    return nodeAcl.createAccess(data, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.send({
          _id: result
        });
      }
    });
  });
  app.put("/access/:id", function(req, res) {
    var data;
    data = req.body;
    data.id = req.params.id;
    return nodeAcl.updateAccess(data, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.end();
      }
    });
  });
  app.del("/access/:id", function(req, res) {
    var data;
    data = {
      id: req.params.id
    };
    return nodeAcl.deleteAccess(data, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.end();
      }
    });
  });
  app.get("/access-group", function(req, res) {
    return nodeAcl.readAccessGroup({}, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    });
  });
  app.get("/access-group/:id", function(req, res) {
    var data;
    data = {
      slug: req.params.slug
    };
    return nodeAcl.readAccessGroup(data, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    });
  });
  app.post("/access-group", function(req, res) {
    var data;
    data = req.body;
    return nodeAcl.createAccessGroup(data, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.send({
          _id: result
        });
      }
    });
  });
  app.put("/access-group/:id", function(req, res) {
    var data;
    data = req.body;
    data.id = req.params.id;
    return nodeAcl.updateAccessGroup(data, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.end();
      }
    });
  });
  app.del("/access-group/:id", function(req, res) {
    var data;
    data = {
      id: req.params.id
    };
    return nodeAcl.deleteAccessGroup(data, function(err, result) {
      if (err != null) {
        return res.send(err);
      } else {
        return res.end();
      }
    });
  });
  app.listen(3000);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}).call(this);
