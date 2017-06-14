import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import 'react-widgets/dist/css/react-widgets.css';
import './AccountForm.css';

class AccountForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="account-name">Name</label>
          <Field id="account-name" name="name" component="input" type="text" placeholder="Account name" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="account-description">Description</label>
          <Field id="account-description" name="description" component="input" type="text" placeholder="Description" className="form-control" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
          <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    );
  }
};

AccountForm = reduxForm({
  form: 'accountForm'
})(AccountForm);

export default AccountForm;
