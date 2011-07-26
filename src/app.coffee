express = require("express")
mockData = require './lib/mockData'

app = module.exports = express.createServer()
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
  
app.get "/define", (req, res) ->
  res.render "define"


# Mock routes for frontend development
app.get "/request", (req, res) ->
  res.send mockData.getRequests
  
app.get "/access", (req, res) ->
  res.send mockData.getAccesses
  
app.get "/access-group", (req, res) ->
  res.send mockData.getAccessGroups
    
    
app.listen 3000
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
