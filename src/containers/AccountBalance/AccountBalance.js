import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../redux/modules/balance/actions';
import { getBalance, isLoading } from '../../redux/modules/balance/reducer';

import moment from 'moment';

import './AccountBalance.css';

const genBalanceTableData = (balance) => {
  const months = [];
  const categories = [];
  for(let monthGroup in balance) {
    if (months.indexOf(monthGroup) === -1) {
      months.push(monthGroup);
    }
    const monthCategories = balance[monthGroup].categories;
    for (let monthCategory in monthCategories) {
      if (categories.indexOf(monthCategory) === -1) {
        categories.push(monthCategory);
      }
    }
  }
  const rows = categories.map((category) => {
    return months.reduce(
      (row, month) => {
        if (balance[month].categories[category] != null) {
          row[month] = balance[month].categories[category];
        }
        return row;
      }
      , {category}
    );
  });
  rows.push(months.reduce((balanceRow, month) => {
    balanceRow[month] = balance[month].balance;
    return balanceRow
  }, {category: '__bsum__'}));
  months.unshift('category')
  return {
    columns: months,
    rows
  }
};

/*const BalancePoints = ({ children }) =>
  <div className="balance-points">
    {children}
  </div>

const BalancePoint = ({ time, value: { balance, categories } }) =>
  <div className={`balance-point${balance > 0 ? " receive" : balance < 0 ? " pay" : ""}`}>
    <p className="balance-point-title">{moment(time).format('MMMM')}</p>
    { categories && Object.keys(categories).map(
      (category) => <p>{`${category}: ${categories[category]}`}</p>
    ) }
    <p className="balance-point-value">R$&nbsp;{balance.toFixed(2)}</p>
  </div>
*/
class AccountBalance extends Component {
  componentDidMount() {
    this.fetchBalance();
  }
  fetchBalance() {
    if (this.props.account != null) {
      const { fetchBalance } = this.props;
      fetchBalance(this.props.account._id);
    }
  }
  render() {
    const { balance, account, isLoading } = this.props;
    const accountBalance = balance(account._id);
    let content;
    if (isLoading(account._id)) {
      content = <p>Loading balance...</p>;
    } else if (accountBalance == null) {
      content = <p>No data</p>;
    } else {
      //const balanceKeys = Object.keys(accountBalance);
      const { columns, rows } = genBalanceTableData(accountBalance);
      /*content = (
        <BalancePoints>
          { balanceKeys.map( (key) =>
            <BalancePoint
              key={`balance-key-${key}`}
              time={key}
              value={accountBalance[key]} /> ) }
        </BalancePoints>
      );*/
      const balanceRow = rows.find((row) => row.category === '__bsum__');
      content = (
        <table className="table table-bordered table-hover table-condensed table-striped table-balance">
          <thead>
            <tr>
              { columns.map((column) =>
              <th className={column === 'category' ? 'th-category' : 'th-month'} key={`th-${column}`}>{column === 'category' ? 'Categories' : moment(column).format('MMM YYYY')}</th>
              ) }
            </tr>
          </thead>
          <tbody>
            { rows.map((row) =>
            <tr className={'tr-' + (row.category === '__bsum__' ? 'sum' : 'category')} key={`tr-balance-${row.category}`}>{ columns.map((column) =>
              <td
                className={
                  (
                    !isNaN(row[column] || row[column] == null) ?
                    ( (balanceRow[column] >= 0 ? ' td-bal-pos' : ' td-bal-neg') )
                    : ''
                  ) +
                  ' td-' + ( row[column] == null ? 'hifen' :
                      isNaN(row[column]) ? 'cat' :
                        row[column] >= 0 ? 'pos' : 'neg' )}
                key={`td-${column}`}>

                {
                  row[column] == null ?
                    '-' :
                    (
                      (column === 'category') ?
                        (
                          row.category === '__bsum__' ?  'Total' : row[column]
                        ) :
                        (
                          'R$ ' + row[column].toFixed(2)
                        )
                    )
                  }
              </td>
            ) }
            </tr>) }
          </tbody>
        </table>
      )
    }
    return (
      <div>
        <h2>Balance</h2>
        {content}
      </div>
    );
  }

}

AccountBalance = connect(
  (state) => ({
    balance: (accountId) => getBalance(state, accountId),
    isLoading: (accountId) => isLoading(state, accountId)
  }),
  actions
)(AccountBalance);

export default AccountBalance;
