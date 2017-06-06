import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccountBalance from '../AccountBalance/AccountBalance';
import TransactionForm from '../TransactionForm/TransactionForm';
import TransactionList from '../../components/TransactionList/TransactionList';

import * as actions from '../../redux/modules/accounts/actions';

class Account extends Component {
  render() {
    const { account, saveTransaction } = this.props;
    return (
      <div>
        <h2>{account.name}</h2>
        <p>{account.description}</p>
        <AccountBalance account={account} />
        <h2>Transactions</h2>
        <TransactionForm onSubmit={(transaction) => saveTransaction(account._id, transaction)} />
        <TransactionList transactions={account.transactions} />
      </div>
    );
  }
}

Account = connect(
  null,
  actions
)(Account);

export default Account;
