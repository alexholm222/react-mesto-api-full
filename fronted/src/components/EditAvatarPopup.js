import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, overlayClose, onUpdateAvatar}) {
  const avatarRef = React.useRef()
  
  function handleSubmit(e) {
      e.preventDefault()
      onUpdateAvatar({
        avatar: avatarRef.current.value
      })
  }

  React.useEffect(()=> {
    avatarRef.current.value = ''; 
  },[isOpen])

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" button="Сохранить" isOpen = {isOpen} onClose = {onClose} overlayClose={overlayClose} onSubmit={handleSubmit}>
      <input ref={avatarRef} type="url" id="input-avatar" name="inputAvatar" required placeholder="Ссылка на изображение" className="popup__input popup__input_avatar"/>
      <span className="popup__error input-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup