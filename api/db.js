const mongooseHelper = require('./helpers/mongoose');

const initializeDB = ({ mongodb }) => mongooseHelper.connect(mongodb);

module.exports = initializeDB;
