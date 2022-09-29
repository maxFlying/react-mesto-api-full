import logo from '../images/header/logo-mesto.svg';
import { Switch, Route, Link } from 'react-router-dom';
import React from 'react';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <div className="header__user-container">
            <Link
              to={'/sign-in'}
              className="header__link"
              onClick={props.onLogout}
            >
              Вход
            </Link>
          </div>
        </Route>
        <Route path="/sign-in">
          <div className="header__user-container">
            <Link
              to={'/sign-up'}
              className="header__link"
              onClick={props.onLogout}
            >
              Регистрация
            </Link>
          </div>
        </Route>
        <Route>
          <div className="header__user-container">
            <p className="header__email">{props.userInfo}</p>
            <Link
              to={'/sign-in'}
              className="header__link"
              onClick={props.onLogout}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
