import React, {useEffect, useState} from 'react';
import {FormValidator} from "../utils/FormValidator";

function SingForm({id, formText, onSubmit, validation = false}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
    setEmail('');
    setPassword('');
  }

  useEffect(()=>{
    if (validation) {
      const popUpCardValidator = new FormValidator(id);
      popUpCardValidator.enableValidation();
    }
  }, [])

  return (
    <form className="form form_theme_auth-black" onSubmit={handleSubmit}>
      <h2 className="form__title form__title_theme_black-sign">{formText.textTitle}</h2>
      <label className="form__field form__field_theme_black-sign">
        <input className="form__input form__input_theme_black-sign"
               id="email"
               type="email"
               placeholder="Email"
               required
               value={email}
               autoComplete="off"
               onChange={handleChangeEmail}/>
        <span className="form__input-error"/>
      </label>
      <label className="form__field form__field_theme_black-sign">
        <input className="form__input form__input_theme_black-sign"
               id="password"
               type="password"
               placeholder="Пароль"
               minLength="2"
               maxLength="30"
               required
               value={password}
               autoComplete="off"
               onChange={handleChangePassword}/>
        <span className="form__input-error"/>
      </label>
      <button className="form__button form__button_theme_black-sign"
              disabled="">
        {formText.textButton}
      </button>
    </form>
  )
}

export default SingForm;
