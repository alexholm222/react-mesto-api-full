const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkValidator } = require('../utils/linkValidator');

const {
  getUsers, getUsersById, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), getUsersById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    about: Joi.string().required().max(30).min(2),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(linkValidator),
  }),
}), updateAvatar);

module.exports = router;
