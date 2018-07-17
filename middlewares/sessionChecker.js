var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        // res.redirect('/');
        next();
    } else {
        // next();
        console.log('user not logged in');
        res.redirect('/user/login');
    }    
  };

module.exports = sessionChecker;  