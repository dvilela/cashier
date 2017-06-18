import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccountBalance from '../AccountBalance/AccountBalance';
import TransactionList from '../../components/TransactionList/TransactionList';

import * as accountActions from '../../redux/modules/accounts/actions';
import { getTransactionsByAccountId } from '../../redux/modules/transactions/reducer';

class Account extends Component {
  render() {
    const { account, getTransactionsByAccountId } = this.props;
    return (
      <div>
        <h2>{account.name}</h2>
        <p>{account.description}</p>
        <AccountBalance account={account} />
        <h2>Transactions</h2>
        <TransactionList accountId={account._id} transactions={ getTransactionsByAccountId(account._id) } />
      </div>
    );
  }
}

Account = connect(
  (state) => ({
    getTransactionsByAccountId: (accountId) => getTransactionsByAccountId(state, accountId)
  }),
  accountActions
)(Account);

export default Account;
