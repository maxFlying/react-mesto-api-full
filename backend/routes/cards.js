const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getCard,
  addCard,
  deleteCard,
  likeCard,
  dilikeCard,
} = require('../controllers/cards');

router.get('/cards', getCard);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().pattern(/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/),
  }),
}), addCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24).max(24),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24).max(24),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24).max(24),
  }),
}), dilikeCard);

module.exports = router;
