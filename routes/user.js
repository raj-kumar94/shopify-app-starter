const router = require('express').Router();
const usersController = require('../controllers/usersController');
const {isAdmin} = require('../middlewares/sessionChecker');
const {csrfProtection} = require('../middlewares/csrfProtection');

router.get('/login',csrfProtection, usersController.getLogin);
router.post('/login', csrfProtection, usersController.postLogin);

/**
 * Remove signup routes on production
*/
if(process.env.SIGNUP == "yes"){
    router.get('/signup', csrfProtection, usersController.getSignup);
    router.post('/signup',csrfProtection, usersController.postSignup);
}

/**
 * route to logout users
*/
router.post('/logout',isAdmin, usersController.logout);

/**
 * Landing page
*/
router.get('/', isAdmin, usersController.home);

module.exports = router;