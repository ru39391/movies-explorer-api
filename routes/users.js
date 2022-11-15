const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUserUpdating } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', validateUserUpdating, updateUser);

module.exports = router;
