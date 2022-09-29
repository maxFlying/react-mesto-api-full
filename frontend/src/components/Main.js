import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar-photo"
          />
        </div>
        <div className="profile__user">
          <h2 className="profile__user-name">{currentUser.name}</h2>
          <button
            className="profile__user-edit"
            onClick={props.onEditProfile}
            type="button"
          />
          <p className="profile__user-info">{currentUser.about}</p>
        </div>
        <button
          className="profile__add"
          onClick={props.onAddPlace}
          type="button"
        />
      </section>

      <section className="photogrid">
        <ul className="photogrid__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              title={card.name}
              img={card.link}
              likes={card.likes}
              onCardClick={props.onCardClick}
              card={card}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
