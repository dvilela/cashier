class AccountClient {
  fetchData() {
    return fetch('http://localhost:8081/api/v1/accounts')
      .then(
        (response) =>
          response.status === 200 ? response.json() :
          response.status === 204 ? []              : null
      )
  }

  fetchBalance(accountId) {
    return fetch(`http://localhost:8081/api/v1/accounts/${accountId}/balance`)
      .then(
        (response) =>
          response.status === 200 ? response.json() : null
      );
  }

  post(account) {
    return fetch('http://localhost:8081/api/v1/accounts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
      })
      .then(() => {});
  }

  postTransaction(accountId, transaction) {
    return fetch(`http://localhost:8081/api/v1/accounts/${accountId}/transactions`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
      })
      .then(() => {});
  }
}

export default new AccountClient();
