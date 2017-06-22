const service = require('../transactions');
const moment = require('moment');

describe('transaction service', () => {
  xit('should resolve scheduling if scheduled', () => {
    const date = moment().utc().subtract(2, 'months').format();
    const scheduling_date = moment().utc().add(2, 'months').format();
    const transaction = {
      ammount: {
        currency: 'BRL',
        total: 10.5
      },
      date,
      scheduling: {
        counted: false,
        date: scheduling_date
      },
      intent: 'pay'
    };
    const transactionAfter = {
      ammount: {
        currency: 'BRL',
        total: 10.5
      },
      date: scheduling_date,
      scheduling: {
        counted: true,
        date: scheduling_date
      },
      intent: 'pay'
    };

    // resolve transaction scheduling middleware
    service.resolveScheduling(transaction);
    expect(transaction).toEqual(transactionAfter)
  });

  it('should group transactions by month', () => {
    const transactions = [{
        ammount: {
          currency: 'BRL',
          total: 10.5
        },
        date: '1991-11-15T12:00:00Z',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 9.5
        },
        date: '1991-11-30T23:59:59Z',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-19T12:00:00Z',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-31T23:59:59Z',
        intent: 'pay'
      }];
    const expected = {
      '1991-11': [transactions[0], transactions[1]],
      '1994-05': [transactions[2], transactions[3]]
    };
    expect(
      service.groupByTime(transactions, { interval: 'month' })
    ).toEqual(expected);
  });

  it('should check month balance', () => {
    // pay attention to the order of transactions
    const transactions = [{
        ammount: {
          currency: 'BRL',
          total: 10000000
        },
        date: '1999-12-31T23:59:59Z',
        intent: 'receive'
      }, {
        ammount: {
          currency: 'BRL',
          total: 9999980
        },
        date: '2000-01-01T00:00:00Z',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10.5
        },
        date: '1991-11-15T12:00:00Z',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 9.5
        },
        date: '1991-11-30T23:59:59Z',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-19T12:00:00Z',
        intent: 'receive'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-31T23:59:59Z',
        intent: 'pay'
      }];
    const expected = {
      '1991-11': -20,
      '1994-05': -20,
      '1999-12': 9999980,
      '2000-01': 0,
    };
    expect(
      service.balance(transactions)
    ).toEqual(expected);
  });

  it('should group transactions by category', () => {
    const transactions = [{
        ammount: {
          currency: 'BRL',
          total: 10.5
        },
        date: '1991-11-15T12:00:00Z',
        category: 'category1',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 9.5
        },
        date: '1991-11-30T23:59:59Z',
        category: 'category1',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-19T12:00:00Z',
        category: 'category2',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-31T23:59:59Z',
        category: 'category2',
        intent: 'pay'
      }];
    const expected = {
      'category1': [transactions[0], transactions[1]],
      'category2': [transactions[2], transactions[3]]
    };
    expect(
      service.groupByCategory(transactions)
    ).toEqual(expected);
  });

  it('balance should group by category', () => {
    // pay attention to the order of transactions
    const transactions = [{
        ammount: {
          currency: 'BRL',
          total: 10000000
        },
        date: '1999-12-31T23:59:59Z',
        category: 'category1',
        intent: 'receive'
      }, {
        ammount: {
          currency: 'BRL',
          total: 9999980
        },
        date: '2000-01-01T00:00:00Z',
        category: 'category2',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10.5
        },
        date: '1991-11-15T12:00:00Z',
        category: 'category1',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 9.5
        },
        date: '1991-11-30T23:59:59Z',
        category: 'category2',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-19T12:00:00Z',
        category: 'category1',
        intent: 'receive'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-31T23:59:59Z',
        category: 'category2',
        intent: 'pay'
      }];
    const expected = {
      '1991-11': {
        categories: { 'category1': -10.5, 'category2': -9.5 },
        balance: -20
      },
      '1994-05': {
        categories: {
          'category1': 10,
          'category2': -10
        },
        balance: -20
      },
      '1999-12': {
        categories: { 'category1': 10000000 },
        balance: 9999980
      },
      '2000-01': {
        categories: {'category2': -9999980 },
        balance: 0
      },
    };
    expect(
      service.balance(transactions, { interval: 'month', groupbycategory: true })
    ).toEqual(expected);
  });
});
