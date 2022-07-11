import {optionsApi} from './config';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  editProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {...this._headers, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: String(name),
        about: String(about)
      })
    })
      .then(this._checkResponse);
  }

  addNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {...this._headers, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: String(name),
        link: String(link)
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  _addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  _deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked){
    return isLiked ? this._addLike(id) : this._deleteLike(id);
  }

  editAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {...this._headers, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        avatar: String(avatar)
      })
    })
      .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) { return res.json(); }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export default new Api(optionsApi);
