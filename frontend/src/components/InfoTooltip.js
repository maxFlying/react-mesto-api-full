import registerDone from '../images/popup/done.svg';
import registerFailed from '../images/popup/failed.svg';

function InfoTooltip(props) {
  return (
    <div
      className={
        props.isOpen ? `popup popup_auth popup_is-active` : `popup popup_auth`
      }
    >
      <div
        className="popup__form popup__form_register"
        name="popup__form"
      >
        <div className="popup__container popup__container-auth">
          <button
            onClick={props.onClose}
            className="popup__close popup__close_auth"
            type="button"
          ></button>
          <img
            className="popup__image-auth"
            src={props.isRegister ? registerDone : registerFailed}
          />
          <h3 className="popup__title popup__title_register">
            {props.isRegister
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
