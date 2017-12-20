const xenditAPI = require('axios');
const cache = require('memory-cache');
const utils = require('loopback/lib/utils');
const errors = require('loopback-common-errors');

xenditAPI.defaults.baseURL = 'https://api.xendit.co';

// TODO: Move to settings
xenditAPI.defaults.headers.common['Authorization'] = process.env.XENDIT_TOKEN;
xenditAPI.defaults.headers.post['Content-Type'] = 'application/json';

const _makeApiCall = (method, relativeUrl, payload, cb) => {
  if (cache.get(relativeUrl) && !payload) {
    return new Promise(resolve => {
      resolve(cache.get(relativeUrl));
    });
  }

  cb = cb || utils.createPromiseCallback();

  let promise;

  switch (method.toLowerCase()) {
    case 'get':
      promise = xenditAPI.get(relativeUrl);
      break;
    case 'post':
      promise = xenditAPI.post(relativeUrl, payload);
      break;
    default:
      cb(errors.badRequest('Invalid method. Only allowed GET and POST.'));
  }

  promise
    .then(function(result) {
      if (!cache.get(relativeUrl) && !payload) {
        cache.put(relativeUrl, result);
      }
      cb(null, result.data);
    })
    .catch(function({response}) {
      cb(errors.otherError(response.data.error_code, response.data.message, 400));
    });

  return cb.promise;
};

const xendit = {
  getBankLIst: cb => {
    return _makeApiCall('GET', '/available_virtual_account_banks', null, cb);
  },

  generateVA: ({transaction, user, bank}, cb) => {
    return _makeApiCall(
      'POST',
      '/callback_virtual_accounts',
      {
        // eslint-disable-next-line
        external_id: transaction.id,
        // eslint-disable-next-line
        bank_code: bank.code,
        name: user.name,
      },
      cb
    );
  },
};

module.exports = xendit;
