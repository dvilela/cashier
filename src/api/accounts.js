const API_URL = 'https://cashier-api.herokuapp.com/api/v1';

const { getToken } = require('./helper');

class TransactionClient {
  post(accountId, transaction) {
    return fetch(`${API_URL}/accounts/${accountId}/transactions`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(transaction)
      })
      .then(() => {});
  }

  put(accountId, transaction) {
    return fetch(`${API_URL}/accounts/${accountId}/transactions/${transaction._id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(transaction)
      })
      .then(() => {});
  }

  delete(accountId, transactionId) {
    return fetch(`${API_URL}/accounts/${accountId}/transactions/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    .then(() => {});
  }
}

class AccountClient {
  constructor() {
    this.transactions = new TransactionClient();
  }

  fetchData() {
    return fetch(`${API_URL}/accounts`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    .then(
      (response) =>
        response.status === 200 ? response.json() :
        response.status === 204 ? []              : null
    );
  }

  fetchBalance(accountId) {
    return fetch(`${API_URL}/accounts/${accountId}/balance`, {
      'Authorization': `Bearer ${getToken()}`
    })
    .then(
      (response) =>
        response.status === 200 ? response.json() : null
    );
  }

  post(account) {
    return fetch(`${API_URL}/accounts`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(account)
      })
      .then(() => {});
  }

  put(account) {
    return fetch(`${API_URL}/accounts/${account._id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(account)
    });
  }

  remove(accountId) {
    return fetch(`${API_URL}/accounts/${accountId}`, {
      method: 'DELETE',
      'Authorization': `Bearer ${getToken()}`
    })
    .then(() => {});
  }
}

export default new AccountClient();
