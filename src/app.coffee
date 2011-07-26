# Export app for other modules
express = require("express")
app = module.exports = express.createServer()

# Module requires
mockData = require './lib/mockData'
NodeAcl = require "./lib/nodeAcl"

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
  res.send mockData.getAccesses
 
# Get single access
app.get "/access/:slug", (req, res) ->
  res.send mockData.getAccesses
  
# Create new access
app.post "/access/:slug", (req, res) ->
  
# Update access
app.put "/access/:slug", (req, res) ->

# Delete access
app.del "/access/:slug", (req, res) ->
  

# Access group
app.get "/access-group", (req, res) ->
  res.send mockData.getAccessGroups
    
    
app.listen 3000
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
