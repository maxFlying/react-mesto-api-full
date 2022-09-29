function ImagePopup(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_photoalbum popup_opacity_dark popup_is-active`
          : `popup popup_photoalbum popup_opacity_dark`
      }
    >
      <div className="popup__photoalbum-container">
        <button
          onClick={props.onClose}
          className="popup__close popup__close_photoalbum"
          type="button"
        ></button>
        <img
          className="popup__photoalbum-image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h3 className="popup__photoalbum-title">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
