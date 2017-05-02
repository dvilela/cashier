import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../redux/modules/balance/actions';
import { getBalance, isLoading } from '../../redux/modules/balance/reducer';

import moment from 'moment';

import './AccountBalance.css';

const BalancePoints = ({ children }) =>
  <div className="balance-points">
    {children}
  </div>

const BalancePoint = ({ time, value }) =>
  <div className={`balance-point${value > 0 ? " receive" : value < 0 ? " pay" : ""}`}>
    <p className="balance-point-title">{moment(time).format('MMMM')}</p>
    <p className="balance-point-value">R$&nbsp;{value.toFixed(2)}</p>
  </div>

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
        <BalancePoints>
          { balanceKeys.map( (key) =>
            <BalancePoint
              key={`balance-key-${key}`}
              time={key}
              value={accountBalance[key]} /> ) }
        </BalancePoints>
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
