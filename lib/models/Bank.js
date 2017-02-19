const { createModel, Schema } = require('./helper');

const schema = {
  accounts: [ Schema.ObjectId ],
  description: String,
  name: String
};

module.exports = createModel('Bank', schema);
