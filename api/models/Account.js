const { createModel, Schema } = require('./helper');

const schema = {
  bank_id: Schema.ObjectId,
  description: String,
  name: String,
  transactions: [ Schema.ObjectId ]
};

module.exports = createModel('Account', schema);
