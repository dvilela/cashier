const { createModel, Schema } = require('./helper');

const schema = {
  ammount: {
    currency: {
      type: String,
      enum: ['BRL'],
      default: 'BRL'
    },
    total: {
      type: Number,
      required: true
    }
  },
  date: {
    type: Date,
    default: new Date()
  },
  description: String,
  intent: {
    type: String,
    enum: ['pay', 'receive'],
    required: true
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
