const service = require('../transactions');
const moment = require('moment');

describe('transaction service', () => {
  it('should resolve scheduling if scheduled', () => {
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
      description: 'Scheduled transaction',
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
      description: 'Scheduled transaction',
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
        description: 'Birth',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 9.5
        },
        date: '1991-11-30T23:59:59Z',
        description: 'Birth',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-19T12:00:00Z',
        description: 'Birth',
        intent: 'pay'
      }, {
        ammount: {
          currency: 'BRL',
          total: 10
        },
        date: '1994-05-31T23:59:59Z',
        description: 'Birth',
        intent: 'pay'
      }];
    const expected = {
      '1991-11-01T00:00:00Z': [transactions[0], transactions[1]],
      '1994-05-01T00:00:00Z': [transactions[2], transactions[3]]
    };
    expect(
      service.groupByMonth(transactions)
    ).toEqual(expected);
  });
});
