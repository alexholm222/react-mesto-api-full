import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, overlayClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(()=>{
      setName(currentUser.name);
      setDescription(currentUser.about);
    },[currentUser, isOpen])

    function handleChangeName(e) {
      setName(e.target.value)
    }
    function handleChangeDescription(e) {
      setDescription(e.target.value)
    }
    function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser({
          name,
          about: description,
      })
    }

    

    return (
    <PopupWithForm name="profile" title="Редактировать профиль" button="Сохранить" isOpen={isOpen} onClose={onClose} overlayClose={overlayClose} onSubmit={handleSubmit}>
      <input value={name || ''} onChange ={handleChangeName} type="text" id="input-name" minLength="2" maxLength="40" name="inputName" required placeholder="Имя" className="popup__input popup__input_profile popup__input_content_name"/>
      <span className="popup__error input-name-error"></span>
      <input value={description || ''} onChange ={handleChangeDescription} type="text" id="input-job" minLength="2" maxLength="200" name="inputJob" required placeholder="Род деятельности" className="popup__input popup__input_profile  popup__input_content_job"/>
      <span className="popup__error  input-job-error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;