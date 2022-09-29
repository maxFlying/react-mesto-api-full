import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `photoalbum__delete ${
    isOwn ? 'photoalbum__delete' : 'photoalbum__delete_off'
  }`;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `photoalbum__like ${
    !isLiked ? 'photoalbum__like' : 'photoalbum__like_is-active'
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="photoalbum">
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
      ></button>
      <img
        className="photoalbum__image"
        src={props.img}
        alt={props.title}
        onClick={handleClick}
      />
      <div className="photoalbum__description">
        <h2 className="photoalbum__title">{props.title}</h2>
        <div className="photoalbum__likezone">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <div className="photoalbum__like-counter">{props.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
