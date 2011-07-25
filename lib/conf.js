(function() {
  var app, development, production;
  app = require('../app');
  development = {
    db: 'mongodb://localhost/node-acl-dev'
  };
  production = {
    db: 'mongodb://localhost/node-acl-prod'
  };
  switch (app.settings.env) {
    case 'development':
      module.exports = development;
      break;
    case 'production':
      module.exports = production;
  }
  module.exports.testDb = 'mongodb://localhost/node-acl-test';
}).call(this);
