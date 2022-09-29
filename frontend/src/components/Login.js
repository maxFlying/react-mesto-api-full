import React from 'react';

function Login(props) {
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = loginData;
    props.onLogin(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form popup__form_auth"
      name="popup__form"
    >
      <h3 className="popup__title popup__title_auth">Вход</h3>
      <input
        onChange={handleChange}
        value={loginData.email}
        type="email"
        className="popup__input popup__input_type_auth"
        name="email"
        placeholder="Email"
        required
        minLength="2"
        maxLength="30"
        id="input-email"
      />
      <span className="popup__input-error" id="input-title-error"></span>
      <input
        onChange={handleChange}
        value={loginData.password}
        type="password"
        className="popup__input popup__input_type_auth"
        name="password"
        placeholder="Пароль"
        required
        id="input_password"
      />
      <span className="popup__input-error" id="input-link-error"></span>
      <button className="popup__button popup__button_auth" type="submit">
        Войти
      </button>
    </form>
  );
}

export default Login;
