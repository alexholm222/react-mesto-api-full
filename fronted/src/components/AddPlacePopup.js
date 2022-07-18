import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, overlayClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeCardName(e) {
    setName(e.target.value)
  }
  function handleChangeCardLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
        name,
        link
    })
  }

  React.useEffect(()=> {
    setName('');
    setLink('')
  },[isOpen])

  return(
    <PopupWithForm name="card" title="Новое место" button="Создать" isOpen = {isOpen} onClose = {onClose} overlayClose={overlayClose} onSubmit={handleSubmit}>
      <input value={name || ''} onChange={handleChangeCardName} type="text" id="input-title" minLength="2" maxLength="30" name="inputTitle" required placeholder="Название" className="popup__input popup__input_card popup__input_content_title"/>
      <span className="popup__error input-title-error"></span>
      <input value={link || ''} onChange={handleChangeCardLink} type="url" id="input-link" name="inputLink" required placeholder="Ссылка на картинку" className="popup__input popup__input_card popup__input_content_link"/>
      <span className="popup__error input-link-error"></span>
    </PopupWithForm>
    )
}
export default AddPlacePopup