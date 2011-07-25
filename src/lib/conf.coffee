app = require('../app')

development =
  db: 'mongodb://localhost/node-acl-dev'


production =
  db: 'mongodb://localhost/node-acl-prod'


switch app.settings.env
  when 'development'
    module.exports = development
  when 'production'
    module.exports = production

module.exports.testDb = 'mongodb://localhost/node-acl-test'