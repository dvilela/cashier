import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import * as actions from '../../redux/modules/accounts/actions';
import { getAccounts, getDeletingAccounts } from '../../redux/modules/accounts/reducer';

import AccountForm from '../AccountForm/AccountForm';
import AccountList from '../../components/AccountList/AccountList';

class Accounts extends Component {
  render() {
    const { save, accounts, fetchData, startAccountDelete, endAccountDelete, deleting, remove } = this.props;

    const onDeleteHandler = (accountId) => startAccountDelete(accountId);

    const fuck = deleting[0];

    const deletingAccount = accounts.find((account) => account._id === (fuck && fuck._id));

    const confirmDeleteHandler = () => remove(deletingAccount._id).then(() => endAccountDelete(deletingAccount._id)).then(fetchData);

    const cancelDeleteHandler = () => endAccountDelete(deletingAccount._id);

    return (
      <div>
        <h2>New Account</h2>
        <AccountForm onSubmit={(account) => save(account).then(fetchData)} />
        <h2>Accounts</h2>
        <AccountList accounts={accounts} onDelete={onDeleteHandler}  />
        <Modal show={deletingAccount != null}>
          <Modal.Header>
            <Modal.Title>Remove resource and all its dependents?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Resource: {' ' + (deletingAccount && deletingAccount.name)}</Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={cancelDeleteHandler}>Close</button>
            <button type="button" className="btn btn-primary" onClick={confirmDeleteHandler}>Remove</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Accounts = connect(
  (state) => ({
    accounts: getAccounts(state),
    deleting: getDeletingAccounts(state)
  }),
  actions
)(Accounts);

export default Accounts;
