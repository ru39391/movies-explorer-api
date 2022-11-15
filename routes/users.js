const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUserUpdating } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', validateUserUpdating, updateUser);

module.exports = router;
