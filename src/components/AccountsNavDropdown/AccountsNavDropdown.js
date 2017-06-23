import React from 'react';
import { connect } from 'react-redux';
import { NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import * as actions from '../../redux/modules/accounts/actions';
import { getAccounts } from '../../redux/modules/accounts/reducer';
import { getToken } from '../../redux/modules/login/reducer';

let AccountsNavDropdown = (props) => {
  const { accounts, eventKey } = props;
  return (
    <NavDropdown {...props} title="Accounts" id="basic-nav-dropdown">
      <LinkContainer exact to="/accounts">
        <MenuItem eventKey={parseFloat(eventKey + '.' + 1)}>Manage accounts</MenuItem>
      </LinkContainer>
      <MenuItem divider />
      {
        accounts.map(
          (account, index) => (
            <LinkContainer key={account._id} to={`/accounts/${account._id}`}>
              <NavItem eventKey={parseFloat(`${eventKey}.${index + 2}`)}>{account.name}</NavItem>
            </LinkContainer>
          )
        )
      }
    </NavDropdown>
  );
};

AccountsNavDropdown = connect(
  (state) => ({
    accounts: getAccounts(state),
    token: getToken(state)
  }),
  actions
)(AccountsNavDropdown);

export default AccountsNavDropdown;
