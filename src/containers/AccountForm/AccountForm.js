import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import 'react-widgets/dist/css/react-widgets.css'

class AccountForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <div>
            <Field name="name" component="input" type="text" placeholder="Account name" />
          </div>
        </div>
        <div>
          <label>Description</label>
          <div>
            <Field name="description" component="input" type="text" placeholder="Description" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    );
  }
};

AccountForm = reduxForm({
  form: 'accountForm'
})(AccountForm);

export default AccountForm;
