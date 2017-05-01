const { crud } = require('./helper');
const Transaction = require('../models/Transaction');
const groupby = require('../helpers/groupby');
const sortObject = require('../helpers/sort-object');
const moment = require('moment');

// service middleware (disabled for now)
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
// const service = crud(Transaction, [resolveScheduling]);
const service = crud(Transaction);

const balance = (transactions, { interval = 'month' } = {}) => {
  const groups = groupByTime(transactions, { interval });
  let lastMonthBalance = 0, group;
  for (group in groups) {
    lastMonthBalance = groups[group].reduce(
      (balance, transaction) =>
        transaction.intent == 'pay' ?
          balance - transaction.ammount.total :
          balance + transaction.ammount.total
      ,
      lastMonthBalance);
    groups[group] = lastMonthBalance;
  }
  return groups;
}

const groupByTime = (transactions, { interval = 'month '} = {}) => {
  if (groupby[interval] == null) {
    throw new Error(`invalid interval "${interval}`);
  }
  return sortObject(groupby[interval](transactions, (transaction) => transaction.date));
};

// for testing pourposes
service.balance = balance;
service.groupByTime = groupByTime;
// service.resolveScheduling = resolveScheduling;

module.exports = service;
