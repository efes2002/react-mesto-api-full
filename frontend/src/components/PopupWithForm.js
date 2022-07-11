import withOverlayAndEscClose from "../hoc/withOverlayAndEscClose";
import React, {useEffect} from 'react';
import {FormValidator} from "../utils/FormValidator";

function PopupWithForm({title, id, submitName, isOpen, onClose,
                         children, onSubmit, isDisabled, validation = false}) {

  const open = isOpen ? 'popup_opened' : '';
  const buttonText = isDisabled ? submitName.saved : submitName.start;

  useEffect(()=>{
    if (validation) {
      const popUpCardValidator = new FormValidator(id);
      popUpCardValidator.enableValidation();
    }
  }, [])

  return (
    <div className={`popup ${open}`} id={id}>
      <div className="popup__container">
        <form className="form" onSubmit={onSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="form__button" disabled={isDisabled}>{buttonText}</button>
        </form>
        <div className="popup__button-x cursor-hover" onClick={onClose}/>
      </div>
    </div>
  )
}

export default withOverlayAndEscClose(PopupWithForm) ;
