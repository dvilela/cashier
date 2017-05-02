import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../redux/modules/balance/actions';
import { getBalance, isLoading } from '../../redux/modules/balance/reducer';

import moment from 'moment';

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
      const balanceKeys = Object.keys(accountBalance);
      content = (
        <table>
          <thead>
            <tr>
              { balanceKeys.map( (key) => <th key={`balance-key-${key}`}>{moment(key).format('MMMM')}</th> ) }
            </tr>
          </thead>
          <tbody>
            <tr>
              { balanceKeys.map( (key) => <td key={`balance-value-${key}`}>R$&nbsp;{accountBalance[key].toFixed(2)}</td> ) }
            </tr>
          </tbody>
        </table>
      );
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
