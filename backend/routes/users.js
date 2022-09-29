const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUser,
  getUserById,
  editProfile,
  editAvatar,
  getMyInfo,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/me', getMyInfo);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().min(24).max(24),
  }),
}), getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().pattern(/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/),
  }),
}), editAvatar);

module.exports = router;
