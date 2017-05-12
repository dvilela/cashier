import React from 'react';
import AccountBalance from '../../containers/AccountBalance/AccountBalance';
import TransactionForm from '../../containers/TransactionForm/TransactionForm';
import TransactionList from '../TransactionList/TransactionList';

export default ({ account }) =>
  <div>
    <h2>{account.name}</h2>
    <p>{account.description}</p>
    <AccountBalance account={account} />
    <h2>Transactions</h2>
    <TransactionForm />
    <TransactionList transactions={account.transactions} />
  </div>
