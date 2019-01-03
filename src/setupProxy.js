const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  console.log("Setup proxy is ever called");
  app.use(proxy('/jwt', { target: 'https://sso.coachingcloud.com/', secure: false }));
  app.use(proxy('/me', { target: 'https://sso.coachingcloud.com/',secure: false }));
};