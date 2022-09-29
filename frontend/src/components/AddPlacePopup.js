import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {

  const [title, setTitle] = React.useState({ title: '' });
  const [link, setLink] = React.useState({ link: '' });

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCard({
      title: title,
      link: link,
    });
  }

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="mesto"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChangeTitle}
        type="text"
        className="popup__input popup__input_type_title"
        name="input_title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="input-title"
        value={title || ''}
      />
      <span className="popup__input-error" id="input-title-error"></span>
      <input
        onChange={handleChangeLink}
        type="url"
        className="popup__input popup__input_type_link"
        name="input_link"
        placeholder="Ссылка на картинку"
        required
        id="input-link"
        value={link || ''}
      />
      <span className="popup__input-error" id="input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
