const path = require('path');
const modelResolver = require('./libs/modelResolver');

// Setup model datasources
const mainDS = 'mainDS';
const fileDS =
  process.env.EXCELLERIFY_S3_KEY && process.env.EXCELLERIFY_S3_KEY_ID ?
    's3DS' :
    'fileDS';
const cacheDS = 'cacheDS';

const myEmailDataSource = 'myEmailDataSource';

// Resolve Model
var modelSources = [
  'loopback/common/models',
  'loopback/server/models',
  '../common/models',
  './models',
].concat(modelResolver([path.resolve(__dirname, '../common/models')]));

const mixinSources = [
  'loopback/common/mixins',
  'loopback/server/mixins',
  '../common/mixins',
  '../node_modules/loopback-softdelete',
  '../node_modules/lb3-excellerify-crudgrid-mixin',
  './mixins',
];

// Setup model
module.exports = {
  _meta: {
    sources: modelSources,
    mixins: mixinSources,
  },
  AccessToken: {
    dataSource: mainDS,
    public: false,
  },
  ACL: {
    dataSource: mainDS,
    public: false,
  },
  RoleMapping: {
    dataSource: mainDS,
    public: false,
    options: {
      strictObjectIDCoercion: true,
    },
  },
  Role: {
    dataSource: mainDS,
    public: false,
  },
  logger: {
    dataSource: mainDS,
    public: true,
  },
  admin: {
    dataSource: mainDS,
    public: true,
  },
  settings: {
    public: true,
    dataSource: mainDS,
    options: {
      remoting: {
        sharedMethods: {
          '*': false,
          getMenu: true,
          form: true,
        },
      },
    },
  }
};
