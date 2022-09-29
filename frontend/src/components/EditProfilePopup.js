import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChangeName}
        type="text"
        className="popup__input popup__input_type_name"
        name="input_name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        id="input-name"
        value={name || ''}
      />
      <span className="popup__input-error" id="input-name-error"></span>
      <input
        onChange={handleChangeDescription}
        type="text"
        className="popup__input popup__input_type_about"
        name="input_about"
        placeholder="Род деятельности"
        required
        minLength="2"
        maxLength="200"
        id="input-about"
        value={description || ''}
      />
      <span className="popup__input-error" id="input-about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
