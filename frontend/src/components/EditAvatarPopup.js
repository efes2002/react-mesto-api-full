import PopupWithForm from "./PopupWithForm";
import React from 'react';
import {useRef} from "react";

function EditAvatarPopup({id, isOpen, onClose, onUpdateAvatar, isDisabled}) {

  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({avatar: inputRef.current.value});
  }
  function handleClose() {
    inputRef.current.value = '';
    onClose();
  }

  return (
    <PopupWithForm
      id={id}
      title="Обновить аватар"
      submitName={{start: "Сохранить", saved: "Сохранение..."}}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      validation={true}>
      <label className="form__field">
        <input id="avatarLink" className="form__input"
               ref={inputRef}
               type="url"
               placeholder="Ссылка на аватар"
               required/>
        <span className="form__input-error"/>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
