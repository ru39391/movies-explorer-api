const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, updateUser,
} = require('../controllers/users');

router.get('/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
