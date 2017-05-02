class AccountClient {
  fetchData() {
    return fetch('http://localhost:8081/api/v1/accounts')
      .then(
        (response) =>
          response.status === 200 ? response.json() : null
      )
  }

  fetchBalance(accountId) {
    return fetch(`http://localhost:8081/api/v1/accounts/${accountId}/balance`)
      .then(
        (response) =>
          response.status === 200 ? response.json() : null
      );
  }
}

export default new AccountClient();
