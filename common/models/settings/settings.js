
const menu = require('./menu.json');

module.exports = function(settings) {
  settings.getMenu = (cb) => {
    cb(null, menu);
  };

  // TODO
  settings.save = (cb) => {
    cb(null, {});
  };
};
