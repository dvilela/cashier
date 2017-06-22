const groupBy = require('lodash/groupBy');
const moment = require('moment');

const month = (data, datee) => {
  if (datee == null) {
    datee = (value) => value;
  }
  return groupBy(data, (value) => moment(datee(value)).utc().startOf('month').format('YYYY-MM'));
};

module.exports = (data, datee = (value) => value) => groupBy(data, datee);

module.exports.month = month;
