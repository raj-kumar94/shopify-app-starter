var cookieParser = require('cookie-parser');
var session = require('express-session');

let setupSession = (app) => {
    // initialize cookie-parser to allow us access the cookies stored in the browser. 
    app.use(cookieParser());
    
    let host = process.env.REDIS_HOST || '127.0.0.1';
    let port = process.env.REDIS_PORT || 6379;
    // initialize express-session to allow us track the logged-in user across sessions.
    if(process.env.REDIS == 'yes'){
        var RedisStore = require('connect-redis')(session);
        app.use(session({
            store: new RedisStore({host:host, port:port}),
            key: 'user_sid',
            secret: 'OneTwoKaFour?',
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: 600000*100
            }
        }));
    }else{
        app.use(session({
            key: 'user_sid',
            secret: 'OneTwoKaFour?',
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: 600000*100
            }
        }));
    }

    // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
    // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
    app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
    });

    // adding property _isAdmin so that it can be used in hbs
    app.use((req, res, next) => {
        if (req.cookies.user_sid && req.session.user && req.session.user_type=='admin') {
            res.locals._isAdmin = true; 
            res.locals.currentUser = req.session.user;    
            next();
        }else{
            next();
        }
    });

}

let isLoggedIn = (req, res, next) => {
    if (req.cookies.user_sid && req.session.user) {
        next();
    }else{
        return res.send({'msg': 'not logged in'});        
    }
}

let isAdmin = (req, res, next) => {
    if (req.cookies.user_sid && req.session.user && req.session.user_type=='admin') {
        // res.locals._isAdmin = true;
        next();
    }else{
        return res.redirect('/user/login');
        // return res.send({'msg': 'not an admin'});        
    }
}

module.exports = {
    setupSession,
    isAdmin
};  