import React from 'react';
import SingForm from './SignForm';

function Login({onLogin}) {

  const formText = {textTitle: "Вход", textButton: "Войти"};

  return (
    <div className="login" id='login'>
      <SingForm formText={formText} onSubmit={onLogin} id={'login'} validation={true}></SingForm>
    </div>
  )
}

export default Login;
