class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInformation() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
    .then(this._checkResponse)
  }

  submitUserInformation(name, about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  submitCards(card) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {return fetch(`${this._options.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: this._options.headers
  })
  .then(this._checkResponse)
  }

  LikeCard(id) {return fetch(`${this._options.baseUrl}/cards/${id}/likes `, {
    method: 'PUT',
    headers: this._options.headers,
  })
  .then(this._checkResponse)
  }

  deleteLikeCard(id) {return fetch(`${this._options.baseUrl}/cards/${id}/likes `, {
    method: 'DELETE',
    headers: this._options.headers
  })
  .then(this._checkResponse)
  }

  submitUserAvatar(avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
     return Promise.reject(`Ошибка: ${res.status}`)
    }
  }
}

export const api = new Api({
  baseUrl: 'https://api.alexholm222.students.nomoredomains.xyz',
  headers: {
    authorization: '123cbfe4-9c7c-4071-ae74-17191aaed0ad',
    'Content-Type': 'application/json'
  }
});


export const apiReact = new Api ({
  baseUrl: 'https://api.alexholm222.students.nomoredomains.xyz',
  headers: {
    authorization: '123cbfe4-9c7c-4071-ae74-17191aaed0ad',
    'Content-Type': 'application/json'
  }
});