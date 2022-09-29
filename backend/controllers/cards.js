const Card = require('../models/card');
const BadRequestError = require('../errors/bad-req-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Переданы некорректные данные при создании карточки. Текст ошибки: ${err.message}`));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const id = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      const ownerId = card.owner.toString();
      if (ownerId !== id) {
        throw new ForbiddenError('Карточка не ваша, Вы не можете ее удалить');
      } else {
        Card.findByIdAndRemove(cardId)
          .then((removedCard) => {
            res.send(removedCard);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(`Переданы некорректные данные для постановки лайка. Текст ошибки: ${err.message}`));
      }
      return next(err);
    });
};

module.exports.dilikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(`Переданы некорректные данные для снятия лайка. Текст ошибки: ${err.message}`));
      }
      return next(err);
    });
};
