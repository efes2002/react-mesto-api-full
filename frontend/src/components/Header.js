import React, {useContext} from 'react';
import logoWhite from '../images/logo-white.png';
import {useNavigate, useLocation} from "react-router-dom";
import {LoggedInUserContext} from "../contexts/LoggedInUserContext";

function Header({userEmail, onSignOut}) {

  const location = useLocation();
  const loggedIn = useContext(LoggedInUserContext);
  const navigate = useNavigate();
  const pathname = location.pathname;

  const nameLink = (pathname === '/sign-up')
    ? 'Войти'
    : (pathname === '/sign-in'
      ? 'Регистрация'
      : 'Выход') ;

  const handleClick = (e) => {
    e.preventDefault();
    if (nameLink === "Войти") {navigate('/sign-in')}
    if (nameLink === "Регистрация") {navigate('/sign-up')}
    if (nameLink === "Выход") { onSignOut(); navigate('/sign-in');}
  };

  return (
    <header className="header">
      <img className="logo logo_color_white" src={logoWhite} alt="Логотип"/>
      <div className="header-menu">
        {loggedIn ? <div className="header-menu_login">{userEmail}</div>:<></>}
        <div className="header-menu_button cursor-hover" onClick={handleClick}>
          {nameLink}
        </div>
      </div>
    </header>
  )
}

export default Header;
