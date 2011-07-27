{spawn, exec} = require 'child_process'
sys = require 'sys'

printOutput = (process) ->
  process.stdout.on 'data', (data) -> sys.print data
  process.stderr.on 'data', (data) -> sys.print data
  
watchJS = ->
  coffee = exec 'coffee -cw -o ./ src/'
  printOutput(coffee)

watchCSS = ->
  stylus = exec 'stylus --watch --include ./public --use ./node_modules/nib/lib/nib.js --out ./public/css ./src/public/css'
  printOutput(stylus)
  
task 'watch', 'Watches all Coffeescript(JS) and Stylus(CSS) files', ->
  watchJS()
  watchCSS()

task 'watchJS', 'Watches all coffeescript files for changes', ->
  watchJS()
  
task 'watchCSS', 'Watches all CSS files for changes', ->
  watchCSS()
  
task 'compile', 'Compiles all Coffeescript files into JS one shot', ->
 coffee = exec "coffee -c -o ./ src/"
 printOutput(coffee)
  
task 'updateJS', 'Updates all modules that are built with Ender for the frontend', ->
  ender = exec 'ender refresh -u ./public/js/ender'
  printOutput(ender)
  
task 'test', 'Runs all tests', ->
  vows = exec 'vows test/*.test.js'
  printOutput(vows)
  
task 'compile-jade', 'compiles all jade templates into JS', ->
  compile = exec '../tmpl-precompile/bin/tmpl-precompile tmpl-precompile.json'
  printOutput(compile)
  
task 'docs', 'generates docs using Docco', ->
  docs = exec 'docco src/lib/*.coffee'
  printOutput(docs)