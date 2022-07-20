class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInformation(token) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
  }

  getInitialCards(token) {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
  }

  submitUserInformation(name, about, token) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  submitCards(card, token) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id, token) {return fetch(`${this._options.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(this._checkResponse)
  }

  LikeCard(id, token) {return fetch(`${this._options.baseUrl}/cards/${id}/likes `, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(this._checkResponse)
  }

  deleteLikeCard(id, token) {return fetch(`${this._options.baseUrl}/cards/${id}/likes `, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(this._checkResponse)
  }

  submitUserAvatar(avatar, token) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
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
    'Content-Type': 'application/json'
  }
});


export const apiReact = new Api ({
  baseUrl: 'https://api.alexholm222.students.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
});