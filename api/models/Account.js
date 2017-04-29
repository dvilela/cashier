const { createModel, Schema } = require('./helper');

const schema = {
  description: String,
  name: String,
  transactions: [ Schema.ObjectId ]
};

module.exports = createModel('Account', schema);
