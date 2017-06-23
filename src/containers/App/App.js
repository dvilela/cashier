import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import { Navbar , Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import * as actions from '../../redux/modules/accounts/actions';
import { logout } from '../../redux/modules/login/actions';
import { getAccounts } from '../../redux/modules/accounts/reducer';
import { getModal } from '../../redux/modules/modal/reducer';
import { getToken } from '../../redux/modules/login/reducer';

import Account from '../Account/Account';
import Accounts from '../Accounts/Accounts';
import AccountsNavDropdown from '../../components/AccountsNavDropdown/AccountsNavDropdown';
import Login from '../Login/Login';

import { Modal } from 'react-bootstrap';

import './App.css';

class App extends Component {
  render() {
    const { accounts, modal, token, logout } = this.props;
    return (
      <div className="App">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Cashier</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/about">
                <NavItem eventKey={1}>About</NavItem>
              </LinkContainer>
              {token == null && (
                <LinkContainer to="/accounts">
                  <NavItem eventKey={2}>Accounts</NavItem>
                </LinkContainer>
              )}
              {token != null && <AccountsNavDropdown eventKey={2} />}
            </Nav>
            <Nav pullRight>
              {token != null ? (
                <NavItem eventKey={3} href="/logout" onClick={() => logout()}>Logout</NavItem>
              ) : (
                <LinkContainer to="/login">
                    <NavItem eventKey={3}>Login</NavItem>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="container">
          <Route path="/about" component={() => (<p>Hello, About!</p>)} />
          <Route path="/login" component={Login} />
          <Route exact path="/accounts" render={props => token != null ? <Accounts {...props} /> : <Redirect to={{pathname: '/login', state: { from: props.location }}} /> } />
          <Route path="/accounts/:id" component={
            (props) => {
              if (token == null) {
                return <Redirect to={{pathname: '/login', state: { from: props.location }}} />;
              }
              const account = accounts.find(({ _id }) => _id === props.match.params.id);
              return account != null ? <Account account={account} /> : null;
            }
          } />
        </div>

        <Modal show={modal.show}>
          <Modal.Header><Modal.Title>{modal.title}</Modal.Title></Modal.Header>
          <Modal.Body>{modal.body}</Modal.Body>
          <Modal.Footer>{modal.footer}</Modal.Footer>
        </Modal>
      </div>
    );
  }
}

App = connect(
  (state) => ({
    accounts: getAccounts(state),
    modal: getModal(state),
    token: getToken(state)
  }),
  {
    ...actions,
    logout: logout
  }
)(App);

export default App;
