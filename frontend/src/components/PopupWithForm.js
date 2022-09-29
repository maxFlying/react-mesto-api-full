function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_${props.name} popup_is-active`
          : `popup popup_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className={`popup__close popup__close_${props.name}`}
          type="button"
        ></button>
        <form
          onSubmit={props.onSubmit}
          className={`popup__form popup__form_${props.name}`}
          name="popup__form"
        >
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
          <button
            className={`popup__button popup__button_${props.name}`}
            type="submit"
          >
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
