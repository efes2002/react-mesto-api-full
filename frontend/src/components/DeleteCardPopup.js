import React from 'react';
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({id, isOpen, onClose, onDeleteCard, isDisabled}) {

  return (
      <PopupWithForm
        id={id}
        title="Вы уверены?"
        submitName={{start: "Да", saved: "Удаление..."}}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onDeleteCard}
        isDisabled={isDisabled}/>
  )
}

export default DeleteCardPopup;
