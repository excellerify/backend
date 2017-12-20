
var path = require('path');
var lodash = require('lodash');
var app = require(path.resolve(__dirname, '../server/server'));
var models = require(path.resolve(
  __dirname,
  '../server/model-config.local.js'
));

function autoUpdateAll(dataSourceName) {
  var ds = app.datasources[dataSourceName];

  console.log('Updating database');

  const tables = [];
  lodash.forEach(models, function(val, key) {
    if (val.dataSource === dataSourceName && !val.noMigration) tables.push(key);
  });

  console.log('Updating database with tables ', tables);

  ds.autoupdate(tables, function(err) {
    if (err) throw err;

    ds.disconnect();

    console.log('Update done, happy coding :)');

    process.exit();
  });
}

autoUpdateAll('mainDS');
