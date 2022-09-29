class Auth {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then(this._checkServerResponse);
  }

  authorize(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }).then(this._checkServerResponse);
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkServerResponse);
  }
}

const auth = new Auth({
  url: 'http://localhost:5500',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default auth;
