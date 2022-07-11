import React, {useContext} from 'react';
import withProtectedRoute from "../hoc/withProtectedRoute";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Profile({onEditAvatar, onEditProfile, onAddPlace}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__avatar-box">
        <img className="profile__avatar" src={currentUser.avatar}
             alt="Фотография аватара путешественника"/>
        <button className="profile__edit-avatar-button cursor-hover"
                onClick={onEditAvatar}/>
      </div>
      <div className="profile__info">
        <div className="profile__title-box">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button cursor-hover"
                  type="button" aria-label="Изменить"
                  onClick={onEditProfile}/>
        </div>
        <p className="profile__job">{currentUser.about}</p>
      </div>
      <button className="profile__add-button cursor-hover"
              type="button" aria-label="Добавить"
              onClick={onAddPlace}/>
    </section>
  )
}

export default withProtectedRoute(Profile);
