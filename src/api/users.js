const API_URL = 'https://cashier-api.herokuapp.com';

class UserClient {
  post(user) {
    return fetch(`${API_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(() => {});
  }
  login(credentials) {
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      .then((result) => {
        return result.status === 401 ? Promise.reject('Invalid Credentials') :
          result.status === 200 ? result.json() : Promise.reject('Could not perform login. Try again.');
      });
  }
}

export default new UserClient();
