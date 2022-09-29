import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { useHistory, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/Auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [userInfo, setUserInfo] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [isRegister, setIsRegister] = React.useState(false);

  const history = useHistory();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  React.useEffect(() => {
    if(loggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if(loggedIn) {
      api
        .getDefaultCard()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .editUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .editUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (item) => {
    console.log(item);
    api
      .addUserCard(item)
      .then((res) => {
        console.log(res);
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    auth
      .checkToken()
      .then((res) => {
        setUserInfo(res.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);

  const onRegister = (data) => {
    return auth
      .register(data)
      .then(() => {
        setIsRegister(true);
        setIsInfoTooltipOpen(true);
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsRegister(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const onLogin = (data) => {
    setUserInfo(data.email);
    return auth
      .authorize(data)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
      })
      .catch((err) => {
        console.log(err);
        setIsRegister(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const onLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/signin');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} userInfo={userInfo} onLogout={onLogout} />

        <Switch>
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>

          <ProtectedRoute
            component={Main}
            expect
            path="/"
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegister={isRegister}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleAddPlaceSubmit}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          button="Да"
        ></PopupWithForm>

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
