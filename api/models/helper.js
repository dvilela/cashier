const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createModel = (name, schema, options) => {
  if (options == null || options.timestamps == null) {
    options = Object.assign({}, options, {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });
  }
  return mongoose.model(name, new Schema(schema, options));
}

module.exports = { createModel, Schema };
