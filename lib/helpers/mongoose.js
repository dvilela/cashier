const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = ({ uri }) => mongoose.connect(uri);

module.exports = { connect };
