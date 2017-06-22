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

const categoryBalance = (transactions) => {
  const groups = groupByCategory(transactions);
  let group;
  for (group in groups) {
    groups[group] = groups[group].reduce(
      (balance, transaction) =>
        transaction.intent == 'pay' ?
            balance - transaction.ammount.total :
            balance + transaction.ammount.total
      , 0
    )
  }
  return groups;
};

const balance = (transactions, { interval = 'month', groupbycategory = false } = {}) => {
  const groups = groupByTime(transactions, { interval });
  let lastMonthBalance = 0, group;
  for (group in groups) {
    lastMonthBalance = groups[group].reduce(
      (balance, transaction) =>
        transaction.intent == 'pay' ?
          balance - transaction.ammount.total :
          balance + transaction.ammount.total
      ,
      lastMonthBalance
    );
    if (groupbycategory) {
      groups[group] = {
        categories: categoryBalance(groups[group]),
        balance: lastMonthBalance
      };
    } else {
      groups[group] = lastMonthBalance;
    }
  }
  return groups;
}

const groupByTime = (transactions, { interval = 'month '} = {}) => {
  if (groupby[interval] == null) {
    throw new Error(`invalid interval "${interval}`);
  }
  return sortObject(groupby[interval](transactions, (transaction) => transaction.date));
};

const groupByCategory = (transactions) => {
  return groupby(transactions, (transaction) => transaction.category);
}

// for testing pourposes
service.balance = balance;
service.groupByTime = groupByTime;
service.groupByCategory = groupByCategory;
// service.resolveScheduling = resolveScheduling;

module.exports = service;
