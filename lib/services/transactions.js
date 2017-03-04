const { crud } = require('./helper');
const Transaction = require('../models/Transaction');
const groupBy = require('../helpers/groupby');
const moment = require('moment');

// service middleware
const resolveScheduling = (transaction) => {
  if (transaction.scheduling != null && transaction.scheduling.date != null) {
    const schedulingDate = moment(transaction.scheduling.date);
    const today = moment();
    if (schedulingDate.isSameOrAfter(today, 'day')) {
      transaction.date = transaction.scheduling.date;
      transaction.scheduling.counted = true;
    }
  }
};

// service
const service = crud(Transaction, [resolveScheduling]);

const groupByMonth = (transactions) =>
  groupBy.month(transactions, (transaction) => transaction.date);


service.groupByMonth = groupByMonth;
service.resolveScheduling = resolveScheduling;

module.exports = service;
