import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getEditing, getDeleting, getAdding } from '../../redux/modules/transactions/reducer';
import * as actions from '../../redux/modules/transactions/actions';
import * as modalActions from '../../redux/modules/modal/actions';
import { fetchData } from '../../redux/modules/accounts/actions';

import TransactionForm from '../TransactionForm/TransactionForm';

import './TransactionList.css';

let TransactionList = ({ accountId, transactions, editing, editStart, showModal, closeModal, remove, fetchData, deleting, adding, saveStart }) => {
  const modal = (transaction) => ({
    id: `transaction[${transaction._id}]`,
    title: `Delete transaction?`,
    body: (
      <div>
        <span>{`Intent: ${transaction.intent}`}</span><br/>
        <span>{`Date: ${transaction.date}`}</span><br/>
        <span>{`Description: ${transaction.description}`}</span><br/>
        <span>{`Value: R$ ${transaction.ammount.total.toFixed(2)}`}</span>
      </div>
    ),
    footer: [
      <button key="cancel" type="button" className="btn btn-default" data-dismiss="modal" onClick={() => closeModal(`transaction[${transaction._id}]`)}>
        <i className="fa fa-ban" />{' '}Cancel
      </button>,
      <button
        key="delete"
        type="button"
        className="btn btn-danger"
        onClick={() => remove(accountId, transaction._id).then(() => closeModal(`transaction[${transaction._id}]`)).then(fetchData)}>

        <i className={'fa ' + (deleting[transaction._id] ? 'fa-cog fa-spin' : 'fa-cloud')}/>{' '}Delete
      </button>
    ]
  });
  return (
    <div>
      <button className="btn btn-primary" onClick={() => saveStart()}>New Transaction</button>
      <table className="table table-hover table-condensed transaction-table">
        <thead>
          <tr>
            <th className="col-date">Date</th>
            <th className="col-intent">Intent</th>
            <th className="col-description">Description</th>
            <th className="col-value">Value</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          { adding && <TransactionForm accountId={accountId} key="tr-new-transaction" /> }
          { transactions && transactions.length > 0 ?
            transactions.map(
              (transaction) =>
                editing[transaction._id] ?
                  <TransactionForm accountId={accountId} key={transaction._id} initialValues={transaction} /> :
                  <tr key={`transaction-${transaction._id}`} className={'transaction-row ' + (transaction.intent === 'receive' ? 'success' : '')} >
                    <td>{moment(transaction.date).format('MMM DD YYYY')}</td>
                    <td>{transaction.intent}</td>
                    <td>{transaction.description}</td>
                    <td>R$ {transaction.ammount.total.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-default btn-sm" onClick={() => editStart(transaction._id)}>
                        <i className="fa fa-pencil" />{' '}Edit
                      </button>
                      <button
                        className="btn btn-default btn-sm"
                        onClick={ () => showModal(modal(transaction))} >

                        <i className="fa fa-trash" />{' '}Delete
                      </button>
                    </td>
                  </tr>
            )
            : <tr><td colSpan="4">No data</td></tr>
          }
        </tbody>
      </table>
    </div>
  );
};

TransactionList = connect(
  (state) => ({
    editing: getEditing(state),
    deleting: getDeleting(state),
    adding: getAdding(state)
  }),
  {
    ...actions,
    ...modalActions,
    fetchData
  }
)(TransactionList);

export default TransactionList;
