function PopupWithForm({name, title, button, children, isOpen, onClose, overlayClose, onSubmit}) {
    return (
    <div onMouseDown={overlayClose} className={`popup popup_content_${name} ${isOpen ? 'popup_opened' : ' '}`}>
      <div className={`popup__container popup__container_${name}`}>
        <button type="button" onClick={onClose} className="popup__button-close button-effect"></button>
        <h2 className="popup__title">{title}</h2>
        <form noValidate onSubmit={onSubmit} name= {`popup-${name}`} className={`popup__form popup__form_${name}`}>
          {children}
          <button type="submit" className="popup__button">{button}</button>
        </form>
      </div>
    </div>
    )
}
export default PopupWithForm