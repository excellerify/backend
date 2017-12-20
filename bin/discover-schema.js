
var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var lbTables = require('./tables.json');

var ds = app.datasources.mainDS;
ds.discoverSchema(lbTables, {schema: 'public'}, function(err, schema) {
  if (err) throw err;

  var json = JSON.stringify(schema, null, '  ');
  console.log(json);

  ds.disconnect();
});
