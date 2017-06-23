import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../../redux/modules/login/actions';
import { getToken, getError, getLoading } from '../../redux/modules/login/reducer';

import './Login.css';

class Login extends Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { handleSubmit, token, loginError, loading, login, pristine, submitting } = this.props;

    if (token) {
      return (
        <Redirect to={from} />
      )
    }

    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <div>
        {loginError && <p className="login-error" >{loginError}</p>}
        <form className="account-form" onSubmit={handleSubmit(login)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" component="input" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" component="input" type="password" className="form-control" />
          </div>
          <div>
            <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

Login = reduxForm({
  form: 'loginForm'
})(Login);

Login = connect(
  (state) => ({
    token: getToken(state),
    loginError: getError(state),
    loading: getLoading(state)
  }),
  actions
)(Login);

export default Login;
