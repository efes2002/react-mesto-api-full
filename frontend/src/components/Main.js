import Card from "./Card";
import {useContext} from 'react';
import React from 'react';
import {LoggedInUserContext} from "../contexts/LoggedInUserContext";
import Login from "./Login";
import Register from "./Register";
import {Route, Routes, Navigate } from "react-router-dom";
import Profile from "./Profile";
import Places from "./Places";

function Main({onEditProfile, onAddPlace, onEditAvatar,
                onCardClick, onCardLike, onCardDelete,
                onRegister, onLogin, cards}) {

  const loggedIn = useContext(LoggedInUserContext);

  const cardsElement = cards.map((item)=>(
      <Card card={item}
          key={item._id}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}/>
    ));

  return (
    <main className="content">
      <Routes>
        <Route path="/main"
               element={
                 <>
                   <Profile onEditAvatar={onEditAvatar}
                            onEditProfile={onEditProfile}
                            onAddPlace={onAddPlace}/>
                   <Places cardsElement={cardsElement}/>
                </>
               }
        />
        <Route path="/sign-up" element={<Register onRegister={onRegister}/>}/>
        <Route path="/sign-in" element={<Login onLogin={onLogin}/>}/>
        <Route path="*" element= {loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />}/>
      </Routes>
    </main>
  )
}

export default Main;
