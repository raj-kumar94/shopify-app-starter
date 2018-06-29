var {User} = require('../models/user');

// route for user signup
exports.getSignup = (req, res) => {
    res.render('signup.hbs');
}

exports.postSignup = (req, res) => {
    User.create({
        // username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(user => {
        req.session.user = user.dataValues;
        res.redirect('/user/dashboard');
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/user/signup');
    });
}


// route for user Login

exports.getLogin = (req, res) => {
    res.render('login.hbs');
}

exports.postLogin = (req, res) => {
    console.log('post login');
    var email = req.body.email,
    password = req.body.password;

    User.findOne({ email: email }).then(function (user) {
        if (!user) {
            console.log('user not found');
            res.redirect('/user/login');
        } else if (!user.validPassword(password)) {
            console.log('not valid password');
            // return res.send('not valid password');
            res.redirect('/user/login');
        } else {
            // console.log(user);
            // console.log(user.validPassword(password));
            req.session.user = user.email;
            res.redirect('/user/dashboard');
        }
    });
}



// route for user's dashboard
exports.dashboard = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log('a');
        res.render('dashboard.hbs');
    } else {
        console.log('b');
        res.redirect('/login');
    }
}


// route for user logout
exports.logout = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
}