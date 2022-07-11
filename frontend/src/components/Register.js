import React from 'react';
import SingForm from './SignForm';
import {useNavigate} from "react-router-dom";

function Register({onRegister}) {
  const navigate = useNavigate();
  const formText = {textTitle: "Регистрация", textButton: "Зарегистрироваться"};

  function handleClick(e) {
    e.preventDefault();
    navigate('/sign-in');
  }

  return (
    <div className="register" id='register'>
      <SingForm formText={formText} onSubmit={onRegister} id={'register'} validation={true}></SingForm>
      <button className="register__button cursor-hover" onClick={handleClick}>Уже зарегистрированы? Войти</button>
    </div>
  )
}

export default Register;
