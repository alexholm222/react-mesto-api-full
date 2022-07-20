import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {  
  const currentUser = React.useContext(CurrentUserContext)
console.log(cards[1]._id)
console.log(cards)
    return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div style={{backgroundImage:`url(${currentUser.avatar})`,backgroundSize: 'cover'}} className="profile__avatar"></div>
          <div onClick = {onEditAvatar} className="profile__overlay"></div>
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__name-subline">{currentUser.about}</p>
          <p className="profile__id" style={{display: 'none'}}></p>
          <button onClick = {onEditProfile} type="button" className="profile__button-edit button-effect"></button>
        </div>
        <button onClick = {onAddPlace} type="button" className="profile__button-add button-effect"></button>
      </section>

      <section className="gallery">
        <ul className="gallery__cards">
          {cards.map((card) => (<Card key={card._id} 
          card={card} onCardClick= {onCardClick} 
          onCardLike = {onCardLike} 
          onCardDelete = {onCardDelete}/>))}
        </ul>
      </section>
    </main>
    )
}
export default Main