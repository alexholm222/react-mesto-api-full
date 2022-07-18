function ImagePopup({card, onClose, overlayClose}) {
    return(
    <div onClick={overlayClose} className={`popup-card popup ${card.isOpen && 'popup_opened'}`}>
      <div className="popup-card__container">
        <img src={card.link} className="popup-card__image" alt={card.name}/>
        <button type="button" onClick={onClose} className="popup__button-close button-effect"></button>
        <h2 className="popup-card__title">{card.name}</h2>
      </div>
    </div>
    )
}
export default ImagePopup;