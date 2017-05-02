import React from 'react';
import AccountBalance from '../../containers/AccountBalance/AccountBalance';

export default ({ account }) =>
  <div>
    <h2>{account.name}</h2>
    <p>{account.description}</p>
    <h2>Balance</h2>
    <AccountBalance account={account} />
  </div>
