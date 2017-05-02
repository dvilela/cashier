import React from 'react';
import AccountBalance from '../../containers/AccountBalance/AccountBalance';
import TransactionList from '../TransactionList/TransactionList';

export default ({ account }) =>
  <div>
    <h2>{account.name}</h2>
    <p>{account.description}</p>
    <AccountBalance account={account} />
    <TransactionList transactions={account.transactions} />
  </div>
