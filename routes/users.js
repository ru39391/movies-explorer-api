const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, updateUser,
} = require('../controllers/users');

router.get('/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(/[a-m0-9]{2,24}/).min(2).max(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(8).max(30),
  }),
}), updateUser);

module.exports = router;
