const groupBy = require('lodash/groupBy');
const moment = require('moment');

const pattern = "YYYY-MM-DDTHH:mm:ssZ";

const month = (data) => {
  const groupedTuples = groupBy(data, (tuple) => moment(tuple[1]).utc().startOf('month').format());
  return Object.keys(groupedTuples).map(key => {
    return { [key]: groupedTuples[key].map((tuple) => tuple[0]) }
  });
}

module.exports = {
  month
};
