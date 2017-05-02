import React from 'react';

export default ({ transactions }) =>
  <div>
    <h2>Transactions</h2>
    {
      transactions && transactions.length ?
        <table className="table table-hover table-condensed">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Description</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {
              transactions.map(
                (transaction) =>
                  <tr key={`transaction-${transaction._id}`} className={transaction.intent === 'receive' ? 'success' : ''} >
                    <td><i className={`fa fa-${transaction.intent === 'pay' ? 'minus' : 'plus'}`} /></td>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>R$ {transaction.ammount.total.toFixed(2)}</td>
                  </tr>
              )
            }
          </tbody>
        </table>
      : <p>No data</p>
    }
  </div>
