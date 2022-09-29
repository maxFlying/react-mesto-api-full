import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [registerData, setRegisterData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = registerData;
    props.onRegister(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form popup__form_auth"
      name="popup__form"
    >
      <h3 className="popup__title popup__title_auth">Регистрация</h3>
      <input
        onChange={handleChange}
        value={registerData.email}
        name="email"
        type="email"
        className="popup__input popup__input_type_auth"
        // name="input_email"
        placeholder="Email"
        required
        minLength="2"
        maxLength="30"
        id="input-email"
      />
      <span className="popup__input-error" id="input-title-error"></span>
      <input
        onChange={handleChange}
        value={registerData.password}
        type="password"
        className="popup__input popup__input_type_auth"
        name="password"
        placeholder="Пароль"
        required
        id="input_password"
      />
      <span className="popup__input-error" id="input-link-error"></span>
      <button className="popup__button popup__button_auth" type="submit">
        Зарегистрироваться
      </button>
      <div className="register__signin">
        <p className="register__signin-title">Уже зарегистрированы?</p>
        <Link to="sign-in" className="register__signin-link">
          &ensp;Войти
        </Link>
      </div>
    </form>
  );
}

export default Register;
