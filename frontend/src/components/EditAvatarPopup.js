import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {
  const avatar = React.useRef();

  function handleClick() {
    return avatar.current.value;
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: handleClick(),
    });
  }

  React.useEffect(() => {
    avatar.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatar}
        type="url"
        className="popup__input popup__input_type_link-avatar"
        name="avatar"
        placeholder="Ссылка на новый аватар"
        required
        id="avatar"
      />
      <span className="popup__input-error" id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
