import React from 'react';
import {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? 'element__like element__like_action' : 'element__like';

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick(e) {
    e.preventDefault();
    onCardLike(card)
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    onCardDelete(card._id);
  }

  return (
    <li className="element">
      <img className="element__img"
           src={card.link}
           alt="Фотография"
           onClick={handleClick}/>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <button className={cardLikeButtonClassName} type="button" aria-label="Лайк"
          onClick={handleLikeClick}
        />
        <p className="element__like-number">{card.likes.length}</p>
      </div>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить"
        onClick={handleDeleteClick}/>
    </li>
  )
}

export default Card;
