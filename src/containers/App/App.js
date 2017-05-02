import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Navbar , Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import * as actions from '../../redux/modules/accounts/actions';
import { getAccounts } from '../../redux/modules/accounts/reducer';

import Account from '../../components/Account/Account';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { fetchData } = this.props;
    fetchData();
  }
  render() {
    const { accounts } = this.props;
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
              <NavDropdown eventKey={3} title="Accounts" id="basic-nav-dropdown">
                <LinkContainer exact to="/accounts">
                  <MenuItem eventKey={3.1}>Manage accounts</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                {
                  accounts.map(
                    (account, index) => (
                      <LinkContainer key={account._id} to={`/accounts/${account._id}`}>
                        <NavItem eventKey={parseFloat(`3.${index + 2}`)}>{account.name}</NavItem>
                      </LinkContainer>
                    )
                  )
                }
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Link Right</NavItem>
              <NavItem eventKey={2} href="#">Link Right</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="container">
          <Route path="/about" component={() => (<p>Hello, About!</p>)} />
          <Route exact path="/accounts" component={() => (<p>Hello, Accounts!</p>)} />
          <Route path="/accounts/:id" component={
            ({ match }) => {
              const account = this.props.accounts.find(({ _id }) => _id === match.params.id);
              return account != null ? <Account account={account} /> : null;
            }
          } />
        </div>
      </div>
    );
  }
}

App = connect(
  (state) => ({
    accounts: getAccounts(state)
  }),
  actions
)(App);

export default App;
