# Export app for other modules
express = require("express")
app = module.exports = express.createServer()

# Module requires
mockData = require './lib/mockData'
nodeAcl = require("./lib/nodeAcl")

app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(__dirname + "/public")

app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure "production", ->
  app.use express.errorHandler()

app.helpers
  title: "node-acl"

# nodeAcl = new NodeAcl()

# Pages
app.get "/", (req, res) ->
  res.render "manage"

app.get "/manage", (req, res) ->
  res.render "manage"
  
app.get "/define", (req, res) ->
  res.render "define"


# Get requeests
app.get "/request", (req, res) ->
  res.send mockData.getRequests

# Get all access  
app.get "/access", (req, res) ->
  nodeAcl.readAccess {}, (err, result) ->
    res.send result
 
# Get single access
app.get "/access/:slug", (req, res) ->
  data = 
    slug: req.params.slug

  nodeAcl.readAccess data, (err, result) ->
    res.send result
  
# Create new access
app.post "/access", (req, res) ->
  data = req.body
  
  nodeAcl.createAccess data, (err, result) ->
    res.send result
  
# Update access
app.put "/access/:slug", (req, res) ->
  data = req.body
  data.slug = req.params.slug

  nodeAcl.updateAccess data, (err, result) ->
    res.send result

# Delete access
app.del "/access/:slug", (req, res) ->
  data = req.body
  data.slug = req.params.slug
  nodeAcl.deleteAccess data, (err, result) ->
    res.send result
  

# Access group
app.get "/access-group", (req, res) ->
  res.send mockData.getAccessGroups
    
    
app.listen 3000
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
