class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers
  }

  _checkServerResponse(res) {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  getDefaultCard() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  editUserInfo(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(this._checkServerResponse)
  }
  
  addUserCard(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: item.title,
        link: item.link
      })
    })
    .then(this._checkServerResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  _addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  _removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkServerResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._removeLike(cardId)
    } else {
      return this._addLike(cardId)
    }
  }

  editUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar
      })
    })
    .then(this._checkServerResponse)
  }

}

const api = new Api({
  url: 'https://api.maxflying.students.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
}
});

export default api;