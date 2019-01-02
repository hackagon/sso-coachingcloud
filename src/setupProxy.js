const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/jwt', { target: 'https://sso.coachingcloud.com/' }));
};