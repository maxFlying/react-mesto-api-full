const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ConflictingRequestError = require('../errors/conflicting-req-err');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(`Некорректный _id: ${err.message}`));
      }
      return next(err);
    });
};

module.exports.addUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictingRequestError('Пользователь с таким email уже зарегистрирован!');
      } else {
        bcrypt.hash(password, 5)
          .then((hashedPassword) => {
            User.create({
              name,
              about,
              avatar,
              email,
              password: hashedPassword,
            })
              .then((addedUser) => res.send(addedUser))
              .catch((err) => {
                if (err.name === 'ValidationError') {
                  return next(new BadRequestError(`Переданы некорректные данные при создании пользователя. Текст ошибки: ${err.message}`));
                }
                return next(err);
              });
          });
      }
    })
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Переданы некорректные данные при обновлении профиля. Текст ошибки: ${err.message}`));
      }
      return next(err);
    });
};

module.exports.editAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Переданы некорректные данные при обновлении аватара. Текст ошибки: ${err.message}`));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      // res.send({ token });
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

      res.cookie('jwt', token, {
        maxAge: 604800,
        httpOnly: true,
        sameSite: true,
      });

      res.send(user.toJSON());
    })
    .catch(next);
};

module.exports.getMyInfo = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
