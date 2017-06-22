import React from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';
import * as actions from '../../redux/modules/transactions/actions';
import { fetchData } from '../../redux/modules/accounts/actions';
import * as modalActions from '../../redux/modules/modal/actions';
import { connect } from 'react-redux';

import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocaliser from 'react-widgets/lib/localizers/moment';

import 'react-widgets/dist/css/react-widgets.css';
import './TransactionForm.css';

momentLocaliser(moment);

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD-MMM-YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />

let TransactionForm = props => {
  const { accountId, handleSubmit, pristine, submitting, editStop, save, saveStop, update, initialValues, fetchData } = props;
  const handleSave = (values) =>
    initialValues && initialValues._id != null ?
      update(accountId, values).then(fetchData).then(() => editStop(initialValues._id)) :
      save(accountId, values).then(fetchData).then(() => saveStop());
  const handleCancel = () =>
    initialValues && initialValues._id != null ?
    editStop(initialValues._id) :
    saveStop();
  return (
    <tr className="form-transaction">
      <td className="form-group form-group-sm">
        <Field className="form-control" name="date" showTime={false} component={renderDateTimePicker} type="text" />
        {/*<Field className="form-control" name="date" component="input" type="text" />*/}
      </td>
      <td className="form-group form-group-sm radio">
        <label>
          <Field name="intent" component="input" type="radio" value="pay" />
          {' '}
          Pay
        </label>
        <label>
          <Field name="intent" component="input" type="radio" value="receive" />
          {' '}
          Receive
        </label>
      </td>
      <td className="form-group form-group-sm">
        <Field className="form-control" name="category" component="input" type="text" />
      </td>
      <td className="form-group form-group-sm">
        <Field className="form-control" name="description" component="input" type="text" />
      </td>
      <td className="form-group form-group-sm">
        <FormSection name="ammount">
          <Field className="form-control" name="total" component="input" type="number" />
        </FormSection>
      </td>
      <td className="form-group form-group-sm td-transaction-form-actions">
        <button className="btn btn-default btn-sm" disabled={submitting} onClick={handleCancel}>
          <i className="fa fa-ban" />{' '}Cancel
        </button>
        <button className="btn btn-success btn-sm"
          disabled={pristine || submitting}
          onClick={handleSubmit(handleSave)} >

          <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/>{' '}Save
        </button>
      </td>
    </tr>
  );
};

TransactionForm = reduxForm({
  form: 'transactionForm'  // a unique identifier for this form
})(TransactionForm);

TransactionForm = connect(
  null,
  {
    ...actions,
    fetchData,
    ...modalActions
  }
)(TransactionForm);

export default TransactionForm;
