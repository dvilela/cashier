import React from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';
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
      <div className="form-group">
        <label htmlFor="transaction-intent">Intent</label>
        <div id="transaction-intent">
          <label>
            <Field component="input" name="intent" type="radio" value="pay" />
            {' '}
            Pay
          </label>
          <label>
            <Field component="input" name="intent" type="radio" value="receive" />
            {' '}
            Receive
          </label>
        </div>
      </div>
      <div>
        <FormSection name="ammount">
          <label htmlFor="form-group">Currency</label>
          <Field id="form-group" className="form-control" name="currency" component="input" type="text" value="BRL" />
          <label>Ammount</label>
          <div>
            <Field name="total" component="input" type="number" value="BRL" />
          </div>
        </FormSection>
      </div>
      <div>
        <label>Date</label>
        <div>
          <Field name="date" showTime={false} component={renderDateTimePicker} type="text" />
        </div>
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
