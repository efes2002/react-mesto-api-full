import {optionsAuthApi} from './config';

class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  addNewUser({email, password}) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: String(password),
        email: String(email)
      })
    })
      .then((res) => {
        try {
          if ((res.status === 200) || (res.status === 201)) {
            return res.json();
          }
        } catch(e){
          return (e)
        }
      })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  authUser({email, password}) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: String(password),
        email: String(email)
      })
    })
      .then((res) => {
        try {
          if ((res.status === 200) || (res.status === 201)) {
            return res.json();
          }
        } catch (e) {
          return e;
        }
      })
      .then((data) => {
        return data;
      })
  }

  validUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        try {
          if ((res.status === 200) || (res.status === 201)) {
            return res.json();
          }
        } catch (e) {
          return (e)
        }
      })
      .then((data) => {
        if (data.email) {
          return data;
        }
        else {return;}
      })
      .catch((err) => console.log(err));
  }
}

export default new AuthApi(optionsAuthApi);
