import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocaliser from 'react-widgets/lib/localizers/moment';

import 'react-widgets/dist/css/react-widgets.css'

momentLocaliser(moment);

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD-MMM-YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />

let TransactionForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="intent">Intent</label>
        <Field name="intent" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <Field name="date" showTime={false} component={renderDateTimePicker} type="text"/>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email"/>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Reset Values</button>
      </div>
    </form>
  );
};

TransactionForm = reduxForm({
  form: 'transactionForm'  // a unique identifier for this form
})(TransactionForm);

export default TransactionForm;
