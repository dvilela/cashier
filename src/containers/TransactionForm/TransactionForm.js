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
      <div>
        <label>Intent</label>
        <div>
          <Field name="intent" component="input" type="text" placeholder="Intent" />
        </div>
      </div>
      <div>
        <FormSection name="ammount">
          <label>Currency</label>
          <div>
            <Field name="currency" component="input" type="text" value="BRL" />
          </div>
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
