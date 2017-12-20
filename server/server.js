var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var app = (module.exports = loopback());
var oauth2 = require('loopback-component-oauth2');

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');

    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.use(loopback.token());
app.use(bodyParser.json()); // for parsing application/json

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  var options = {
    dataSource: app.datasources.mainDS, // Data source for oAuth2 metadata persistence
    loginPage: 'api/auth', // The login page URL
    loginPath: 'api/auth', // The login form processing URL
  };

  oauth2.oAuth2Provider(
    app, // The app instance
    options // The options
  );

  oauth2.authenticate(['/protected', '/api', '/me'], {
    session: false,
    scope: 'email',
  });

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
