const { createModel, Schema } = require('./helper');

const schema = {
  ammount: {
    currency: {
      type: String,
      enum: ['BRL']
    },
    total: Number
  },
  date: {
    type: Date,
    default: new Date()
  },
  description: String,
  intent: {
    type: String,
    enum: ['pay', 'receive']
  },
  payer: {
    id: Schema.ObjectId,
    name: String
  },
  receiver: {
    id: Schema.ObjectId,
    name: String
  },
  scheduling: {
    counted: {
      type: Boolean
    },
    date: Date
  }
};

module.exports = createModel('Transaction', schema);
