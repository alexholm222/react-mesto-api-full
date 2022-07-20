import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`card__delete button-effect ${isOwn ? '' : 'card__delete_hidden'}`);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''}`)

  function handleClick() {
    onCardClick(card)
  }
  
  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

return(
  <li className="card">
    <div onClick={handleClick} style={{backgroundImage:`url(${card.link})`,backgroundSize: 'cover'}} className="card__image"></div>
      <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__container">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
        <p className="card__counter-like">{card.likes.length}</p>
        </div>
     </div>
  </li>       
)
}
export default Card;