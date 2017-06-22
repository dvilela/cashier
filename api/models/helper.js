const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

const createModel = (name, schema, options) => {
  if (options == null || options.timestamps == null) {
    options = Object.assign({}, options, {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });
  }
  return mongoose.model(name, new Schema(schema, options));
}

const createUserModel = () => {
  var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });

  UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });

  UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

  return mongoose.model('User', UserSchema);
}

module.exports = { createModel, Schema, createUserModel };
