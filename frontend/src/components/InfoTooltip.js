import React from 'react';
import logoYes from '../images/logoYes.png';
import logoNo from '../images/logoNo.png';
import {useNavigate} from "react-router-dom";

function InfoTooltip({id, isOpen, onClose, valueInfoTooltip, validation= false}) {

  const navigate = useNavigate();
  const {isSuccess, textMessage, redirectLink} = valueInfoTooltip

  const logo = isSuccess === 'yes' ?  logoYes : logoNo;
  const open = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup ${open}`} id={id}>
      <div className="popup__container">
        <form className="form info-tooltip">
          <img className="info-tooltip__img" src={logo} alt="Значек результата"/>
          <h2 className="form__title info-tooltip__title">{textMessage}</h2>
        </form>
        <div className="popup__button-x cursor-hover"
             onClick={() => { onClose(); navigate(redirectLink);}}/>
      </div>
    </div>
  )
}

export default InfoTooltip;
