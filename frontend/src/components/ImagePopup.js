import React from 'react';
import withOverlayAndEscClose from "../hoc/withOverlayAndEscClose";

function ImagePopup({id, isOpen, onClose, card}) {

  const open = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup ${open}`} id={id}>
      <div className="popup__container">
        <div className="element-view">
          <img className="element-view__img"
               src={card.link}
               alt="Фотография"/>
          <h2 className="element-view__title">{card.name}</h2>
        </div>
        <button className="popup__button-x cursor-hover"
                type="button" aria-label=""
                onClick={onClose}/>
      </div>
    </div>
  )
}
export default withOverlayAndEscClose(ImagePopup);
