import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import {useState, useEffect} from "react";
import Api from "../utils/Api";
import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {LoggedInUserContext} from "../contexts/LoggedInUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import AuthApi from "../utils/AuthApi";
import {useNavigate} from "react-router-dom";
import {optionsApi} from "../utils/config";

function App() {

  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState('');
  const [valueInfoTooltip, setValueInfoTooltip] = useState({isSuccess: '', textMessage: '', redirectLink: ''});
  const [isDisabledButtonPopup, setIsDisabledButtonPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [sessionToken, setSessionToken] = useState(localStorage.getItem('token'));

  const api = new Api({
    ...optionsApi,
    headers: {
      authorization: `Bearer ${sessionToken}`
    }
  });

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleDeletePlaceClick = () => {
    setIsDeletePlacePopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  const handleCardDeletePopup = (id) => {
    setCardId(id);
    handleDeletePlaceClick();
  }
  const handleInfoTooltip = () => {
    setInfoTooltipPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
    setValueInfoTooltip({isSuccess: '', textMessage: '', redirectLink: ''})
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateUser = ({name, about}) => {
    setIsDisabledButtonPopup(true);
    api.editProfile({name, about})
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
        setIsDisabledButtonPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateAvatar = ({avatar}) => {
    setIsDisabledButtonPopup(true);
    api.editAvatar({avatar})
      .then((res) => {
        setCurrentUser(res)
      })
      .then(() => {
        closeAllPopups();
        setIsDisabledButtonPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDelete = (e) => {
    e.preventDefault();
    setIsDisabledButtonPopup(true);
    api.deleteCard(cardId).then(() => {
      setCards(cards.filter(item => item._id !== cardId));
      setIsDisabledButtonPopup(false);
    })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    setIsDisabledButtonPopup(true);
    api.addNewCard({name, link})
      .then((res) => {
        setCards([res, ...cards]);
        setIsDisabledButtonPopup(false);
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    setSessionToken(token);
    if (token === 'undefined') {
      onSignOut();
    } else {
      if (token) {
        AuthApi.validUser(token)
          .then((data) => {
              if (data.email) {
                setUserEmail(data.email);
                setLoggedIn(true);
                navigate('/main');
              }
            }
          )
          .catch((err) => {
            console.log(err);
          });
      } else {
        onSignOut();
      }
    }
  }

  const onLogin = (email, password) => {
    AuthApi.authUser({email: email, password: password})
      .then((data) => {
        if (data) {
          const token = data.token;
          localStorage.setItem('token', token);
          tokenCheck();
        } else {
          setValueInfoTooltip({
            isSuccess: 'no',
            textMessage: 'Что-то пошло не так! Попробуйте ещё раз.',
            redirectLink: '/sign-in'
          });
          setInfoTooltipPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onSignOut = () => {
    localStorage.removeItem('token');
    setSessionToken('');
    setUserEmail('');
    setLoggedIn(false);
  }

  const onRegister = (email, password) => {
    AuthApi.addNewUser({email: email, password: password})
      .then((data) => {
        if (data) {
          setValueInfoTooltip({
            isSuccess: 'yes',
            textMessage: 'Вы успешно зарегистрировались!',
            redirectLink: '/sign-in'
          });
          setInfoTooltipPopupOpen(true);
        } else {
          setValueInfoTooltip({
            isSuccess: 'no',
            textMessage: 'Что-то пошло не так! Попробуйте ещё раз.',
            redirectLink: '/sign-up'
          });
          setInfoTooltipPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      api.getProfile()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
      api.getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, [loggedIn, sessionToken])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInUserContext.Provider value={loggedIn}>
        <div className="page">
          <Header userEmail={userEmail} onSignOut={onSignOut}/>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeletePopup}
            onRegister={onRegister}
            onLogin={onLogin}
            onTooltip={handleInfoTooltip}
            cards={cards}/>
          <Footer/>
        </div>
        <ImagePopup
          id="popup-card-view"
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          isDisabled={isDisabledButtonPopup}/>
        <EditProfilePopup
          id="popup-edit-profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isDisabled={isDisabledButtonPopup}/>
        <AddPlacePopup
          id="popup-add-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isDisabled={isDisabledButtonPopup}/>
        <EditAvatarPopup
          id="popup-edit-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isDisabled={isDisabledButtonPopup}/>
        <DeleteCardPopup
          id="popup-card-delete"
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          isDisabled={isDisabledButtonPopup}/>
        <InfoTooltip
          id="popup-info-tooltip"
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          valueInfoTooltip={valueInfoTooltip}
          validation={true}
        />
      </LoggedInUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
