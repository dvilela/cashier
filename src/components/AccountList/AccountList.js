import React from 'react';

const AccountList = ({ accounts, onDelete }) => (
  <table className="table table-hover table-condensed">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        accounts && accounts.length > 0 ?
          accounts.map((account, index) =>
            <tr key={`account-id-${account._id}`}>
              <td>{account.name}</td>
              <td>{account.description}</td>
              <td>
                <i className="fa fa-trash-o" aria-hidden="true" onClick={() => onDelete(account._id)}  ></i>
              </td>
            </tr>
          ) :
          <tr>
            <td colSpan="2">No data</td>
          </tr>
      }
    </tbody>
  </table>
);

export default AccountList;
