const express = require("express");
var router = express.Router();

const usersController = require('../controllers/usersController');
const sessionChecker = require('../middlewares/sessionChecker');

router.get('/login',sessionChecker, usersController.getLogin);
router.post('/login', usersController.postLogin);
router.get('/signup',sessionChecker, usersController.getSignup);
router.post('/signup', usersController.postSignup);
router.get('/logout', usersController.logout);

module.exports = router;