const LoopBackContext = require('loopback-context');
const errors = require('loopback-common-errors');
const utils = require('loopback/lib/utils');
const uuidv4 = require('uuid/v4');

const app = require('../server/server');
const xenditAPI = require('./xendit');

const virtualAccount = {
  generate: async({bank, productId}, cb) => {
    cb = cb || utils.createPromiseCallback();

    const ctx = LoopBackContext.getCurrentContext();
    const user = ctx.get('currentUser');

    try {
      const product = await app.models.Product.findById(productId);
      // check if one or more nulls
      if (!product) {
        const msg = 'Invalid product id';
        cb(errors.badRequest(msg));
        return;
      }

      const transaction = {
        id: uuidv4(),
        userId: user.id,
        bankId: bank.id,
        productId: product.id,
        status: false,
      };

      const xenditData = await xenditAPI.generateVA({
        transaction,
        user,
        bank,
      });

      // set xendit transaction data
      transaction.accountName = xenditData.name;
      transaction.accountNumber = xenditData.account_number;
      transaction.ownerId = xenditData.owner_id;
      transaction.bankCode = xenditData.bank_code;

      await app.models.Transaction.create(transaction);

      cb(null, {
        accountNumber: transaction.accountNumber,
        accountName: transaction.accountName,
        bank: transaction.bankCode,
        productId,
        userId: user.id,
      });
    } catch (err) {
      cb(err);
    }

    return cb.promise;
  },
};

module.exports = virtualAccount;
