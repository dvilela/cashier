import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar , Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';

class App extends Component {
  render() {
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
                <LinkContainer to="/accounts">
                  <MenuItem eventKey={3.1}>Manage accounts</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                <MenuItem eventKey={3.2}>Another action</MenuItem>
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
          <Route path="/accounts" component={() => (<p>Hello, accounts!</p>)} />
        </div>
      </div>
    );
  }
}

export default App;
