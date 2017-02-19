const { createModel, Schema } = require('./helper');

const schema = {
  ammount: {
    currency: {
      type: String,
      enum: ['BRL']
    },
    total: Number
  },
  description: String,
  intent: {
    type: String,
    enum: ['pay', 'receive']
  },
  payer: Schema.ObjectId,
  receiver: Schema.ObjectId,
  schedule_date: Date
};

module.exports = createModel('Transaction', schema);
