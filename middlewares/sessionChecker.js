var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/user/dashboard');
    } else {
        next();
    }    
  };

module.exports = sessionChecker;  