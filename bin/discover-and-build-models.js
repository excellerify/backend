
var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var lbTables = require('./tables.json');

var ds = app.datasources.mainDS;
ds.discoverAndBuildModels(lbTables, {schema: 'public'}, function(err, models) {
  if (err) throw err;

  models.Product.find(function(err, products) {
    if (err) return console.log(err);

    console.log(products);

    ds.disconnect();
  });
});
