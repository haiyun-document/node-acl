vows = require 'vows'
assert = require 'assert'

# # Access module
# ## Test 1: access.get()
testAccessGet = vows.describe 'Access: access.get()'

# access.get() = Get all accesses
getAllAccess = 
  'GIVEN a access.get() request':
    topic: ->
      this.callback(null, 'function not ready')
    'SHOULD have no error': (err, res) -> assert.isNull err
    'SHOULD be an array of all access objects': (err, res) -> 
      assert.isArray res
    'EACH access object should contain slug': (err, res) -> 
      assert.include res[0], 'slug'
    'EACH access object should contain enabled state': (err, res) -> 
      assert.include res[0], 'allow'


# access.get('slug_string') = Get specific access
getOneAccess = 
  "GIVEN a access.get('slug_string') request":
    topic: ->
      this.callback(null, 'function not ready')
    'SHOULD have no error': (err, res) -> assert.isNull err
    'SHOULD be an objects': (err, res) -> 
      assert.isObject res
    'SHOULD should contain slug': (err, res) -> 
      assert.include res, 'slug'
    'SHOULD contain enabled state': (err, res) -> 
      assert.include res, 'allow'

# ## Test 2: access.add()
testAccessAdd = vows.describe 'Access: access.add()'

# access.add(params) = Add a new access
#
#     @params:
#       slug: String
#       allow: Boolean

addAccess = 
  'GIVEN a access.add({slug: String, allow: Boolean}) request':
    topic: ->
      this.callback(null, 'function not ready')
    'SHOULD have no error': (err, res) -> assert.isNull err
    "SHOULD return 'success'": (err, res) -> 
      assert.isArray res

    
# ## Test 3: access.edit()
testAccessEdit = vows.describe 'Access: access.edit()'

# access.edit(params) = Get all accesses
#
#     @params:
#       slug: String
#       allow: Boolean

addAccess = 
  'GIVEN a access.add({slug: String, allow: Boolean}) request':
    topic: ->
      this.callback(null, 'function not ready')
    'SHOULD have no error': (err, res) -> assert.isNull err
    "SHOULD return 'success'": (err, res) -> 
      assert.isArray res



  
testAccessGet
  .addBatch(getAllAccess)
  .addBatch(getOneAccess)
  .export(module)
  
testAccessAdd
  .addBatch(addAccess)
  .export(module)