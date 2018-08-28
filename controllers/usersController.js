"use strict";

var {User} = require('../models/user');

// route for user signup
exports.getSignup = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        res.render('signup.hbs', {title: "Awesome App", csrfToken: req.csrfToken()});
    }
}

/**
 * Admin signup route
 */ 

exports.postSignup = (req, res) => {
    let user_type = 'admin';

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        user_type: user_type
    })
    .then(user => {
        req.session.user = req.body.email;
        req.session.user_type = user_type;
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/user/signup');
    });
};


// route for user Login

exports.getLogin = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        res.render('login.hbs', {title: "Login", csrfToken: req.csrfToken()});
    }
}


exports.postLogin = (req, res) => {
    // console.log('post login');
    var email = req.body.email,
    password = req.body.password;

    User.findOne({ email: email }).then(function (user) {
        if (!user) {
            console.log('user not found');
            res.redirect('/user/login');
        } else if (!user.validPassword(password)) {
            console.log('not valid password');
            res.redirect('/user/login');
        } else {
            req.session.user = user.email;
            req.session.user_type = user.user_type;
            res.redirect('/');
        }
    });
}



// route for user's dashboard
exports.home = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('index.hbs');
    } else {
        res.redirect('/user/login');
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