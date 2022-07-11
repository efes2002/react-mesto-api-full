import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

function AddPlacePopup({id, isOpen, onClose, onAddPlace, isDisabled}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name, link});
    setName('');
    setLink('');
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  function handleClose() {
    setName('');
    setLink('');
    onClose();
  }

  return (
    <PopupWithForm
      id={id}
      title="Новое место"
      submitName={{start: "Создать", saved: "Сохранение..."}}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      validation={true}>
      <>
        <label className="form__field">
          <input id="cardName" className="form__input"
                 value={name}
                 onChange={handleChangeName}
                 type="text"
                 placeholder="Название"
                 minLength="2"
                 maxLength="30"
                 required/>
          <span className="form__input-error"/>
        </label>
        <label className="form__field">
          <input id="cardLink" className="form__input"
                 value={link}
                 onChange={handleChangeLink}
                 type="url"
                 placeholder="Ссылка на картинку"
                 required/>
          <span className="form__input-error"/>
        </label>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
