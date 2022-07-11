import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {useState, useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({id, isOpen, onClose, onUpdateUser, isDisabled}) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({name, about: description});
  }
  function handleClose() {
    onClose();
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      id={id}
      title="Редактировать профиль"
      submitName={{start: "Сохранить", saved: "Сохранение..."}}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      validation={true}
    >
      <label className="form__field">
        <input id="profileName" className="form__input"
               value={name || ''}
               onChange={handleChangeName}
               name="name"
               type="text"
               placeholder="Имя"
               minLength="2"
               maxLength="40"
               required/>
        <span className="form__input-error"/>
      </label>
      <label className="form__field">
        <input id="profileJob" className="form__input"
               value={description || ''}
               onChange={handleChangeDescription}
               name="job"
               type="text"
               placeholder="Профессия"
               minLength="2"
               maxLength="200"
               required/>
        <span className="form__input-error"/>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
