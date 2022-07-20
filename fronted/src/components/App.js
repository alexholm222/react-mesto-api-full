import React from 'react';
import { Route, useHistory, Switch} from 'react-router-dom';
import { apiReact } from '../utils/Api.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import PageNotFound from './PageNotFound';
import ProtectedRoute from './ProtectedRoute';
import * as auth from "../utils/Auth"
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name:"",
    link: ""
  })
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [isSuccessRegistPopupOpen, setIsSuccessRegistPopupOpen] =React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('')
  const hist = useHistory();
  const token = localStorage.getItem('token');

  React.useEffect(()=> {
      if(token) {
        auth.getContent(token).then((res) => {
          if(res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            hist.push("/")
          }  
        },[token])
        .catch(err => console.log(err))
      }
  })
  
  React.useEffect(() => {
    Promise.all([apiReact.getUserInformation(token), apiReact.getInitialCards(token)])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData.data);
        setCards(cardsData.data.reverse())
      })
      .catch(err => console.log(err))
  },[token])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link
    });
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({
      isOpen: false,
      link: "",
      name: "" 
    });
    setIsErrorPopupOpen(false);
    setIsSuccessRegistPopupOpen(false);
  }

  function closeOnOverlay(e) { 
    if (e.target === e.currentTarget) { 
      closeAllPopups(); 
    } 
  } 

  React.useEffect(() => {function handleEscClose(e) {
    if(e.key === 'Escape') {
      closeAllPopups()
    }}
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])

  function handleUpdateUser({name, about}) {
    apiReact.submitUserInformation(name, about, token)
      .then((userData) => {
        setCurrentUser(userData.data);
        closeAllPopups();
        console.log(userData.data)
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar({avatar}) {
    apiReact.submitUserAvatar(avatar, token)
      .then(userData => {
        setCurrentUser(userData.data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    apiReact.submitCards(card, token)
      .then(newCard => {
        setCards([newCard.data, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

 function handleCardLike(card) {
  const isLiked = card.likes.some(id => id === currentUser._id);
  if (!isLiked) {
    apiReact.LikeCard(card._id, token)
    .then(newCard => {
      setCards((state) => state.map((c)=> c._id === card._id ? newCard.data : c))
      })
     .catch(err => console.log(err))
    } else {
     apiReact.deleteLikeCard(card._id, token)
    .then(newCard => {
      setCards((state) => state.map((c)=> c._id === card._id ? newCard.data : c))
      })
    .catch(err => console.log(err)) 
   } 
}

function handleCardDelete(card) {
  const isOwn = card.owner === currentUser._id;
  apiReact.deleteCard(card._id, token, !isOwn)
    .then(() => {
      setCards((state) => state.filter((c)=> c._id !== card._id ))
      })
    .catch(err => console.log(err))
}

function handleSingOut() {
  localStorage.removeItem('token');
  hist.push("/sign-in")
}

  return (
  <CurrentUserContext.Provider value={currentUser}>
  <div className="page">
    <Header userEmail={userEmail} signOut={handleSingOut}/>
    <Switch>
       <ProtectedRoute
         exact
         path="/"
         loggedIn={loggedIn}
         component={Main}
         onEditProfile = {handleEditProfileClick} onAddPlace = {handleAddPlaceClick} onEditAvatar = {handleEditAvatarClick}
         onCardClick = {handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
       />
      <Route path="/sign-up">
        <Register overlayClose={closeOnOverlay} onClose={closeAllPopups} isOpen={isSuccessRegistPopupOpen} setIsOpen={setIsSuccessRegistPopupOpen}/>   
      </Route>
      <Route path="/sign-in">
        <Login overlayClose={closeOnOverlay} onClose={closeAllPopups} isOpen={isErrorPopupOpen} handleLogin={setLoggedIn} setIsOpenError={setIsErrorPopupOpen} userEmail={setUserEmail}/>  
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
    <Footer />
    <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} overlayClose={closeOnOverlay} onUpdateUser={handleUpdateUser} />
    <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} overlayClose={closeOnOverlay} onAddPlace={handleAddPlaceSubmit}/> 
    <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} overlayClose={closeOnOverlay} onUpdateAvatar={handleUpdateAvatar}/>
    <PopupWithForm name="delete" title="Вы уверены ?" button="Да" />
    <ImagePopup card={selectedCard} onClose = {closeAllPopups} overlayClose={closeOnOverlay}/>
  </div>
  </CurrentUserContext.Provider>
  );
}
export default App;
