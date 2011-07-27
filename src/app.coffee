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

# ## Access Routes

# Get all access  
app.get "/access", (req, res) ->
  nodeAcl.readAccess {}, (err, result) ->
    if err? then res.send err else res.send result
 
# Get single access
app.get "/access/:id", (req, res) ->
  data = 
    slug: req.params.slug

  nodeAcl.readAccess data, (err, result) ->
    if err? then res.send err else res.send result
  
# Create new access
app.post "/access", (req, res) ->
  data = req.body
  nodeAcl.createAccess data, (err, result) ->
    if err? then res.send err
    else
      res.send _id: result
  
# Update access
app.put "/access/:id", (req, res) ->
  data =
    id : req.params.id
    newSlug: req.body.slug
    newName: req.body.name
    newDesc: req.body.desc
    newEnable: req.body.enable

  nodeAcl.updateAccess data, (err, result) ->
    if err? then res.send err
    else res.end()

# Delete access
app.del "/access/:id", (req, res) ->
  data = 
    id : req.params.id
  nodeAcl.deleteAccess data, (err, result) ->
    if err? then res.send err
    else res.end()
    
# ## Access Group Routes

# Get all access groups
app.get "/access-group", (req, res) ->
  nodeAcl.readAccessGroup {}, (err, result) ->
    if err? then res.send err else res.send result

# Get single access group
app.get "/access-group/:id", (req, res) ->
  data = 
    slug: req.params.slug

  nodeAcl.readAccessGroup data, (err, result) ->
    if err? then res.send err else res.send result

# Create new access group
app.post "/access-group", (req, res) ->
  data = req.body
  nodeAcl.createAccessGroup data, (err, result) ->
    if err? then res.send err
    else res.send _id: result

# Update access group
app.put "/access-group/:id", (req, res) ->
  data =
    id : req.params.id
    newSlug: req.body.slug
    newName: req.body.name
    newDesc: req.body.desc
    newEnable: req.body.enable
    newAccess: req.body.access || []

  nodeAcl.updateAccessGroup data, (err, result) ->
    if err? then res.send err
    else res.end()

# Delete access group
app.del "/access-group/:id", (req, res) ->
  data = 
    id : req.params.id
  nodeAcl.deleteAccessGroup data, (err, result) ->
    if err? then res.send err
    else res.end()
    
    
app.listen 3000
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
