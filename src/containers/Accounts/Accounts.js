import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../redux/modules/accounts/actions';

import AccountForm from '../AccountForm/AccountForm';

class Accounts extends Component {
  render() {
    const { save } = this.props;
    return (
      <AccountForm onSubmit={(account) => save(account)} />
    );
  }
}

Accounts = connect(
  null,
  actions
)(Accounts);

export default Accounts;
