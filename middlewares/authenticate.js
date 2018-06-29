var {User} = require('../models/user');


// creating an auth middleware
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    
    User.findByToken(token).then( (user) => {
        if(!user){
            return Promise.reject('rejected');
        }
        // res.send(user);
        req.user = user;
        req.token = token;
        next();
    }).catch( (err) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};