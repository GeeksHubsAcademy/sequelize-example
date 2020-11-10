const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAll)
router.post('/signup', UserController.signup)
router.post('/login', UserController.login)

module.exports = router;