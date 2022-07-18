import React from "react";

function InfoTooltip ({isOpen, overlayClose, onClose, title, image}) {
  return (
    <div onMouseDown={overlayClose} className={`popup ${isOpen ? 'popup_opened' : ' '}`}>
      <div className={`popup__container`}>
        <button type="button" onClick={onClose} className="popup__button-close button-effect"></button>
        <img src={image} alt="иконка уведомления" className="popup__image"/>
        <h2 className="popup__title popup__title_auth">{title}</h2>
      </div>
    </div>  
  )
}

export default InfoTooltip;