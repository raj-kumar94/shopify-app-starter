const mongoose = require('mongoose');
const validator = require('validator');
// const jwt = require('jsonwebtoken');
// var _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            unique: true,
            validate: {
                validator: (value) => {
                    return validator.isEmail(value);
                },
                message: `{VALUE} is not a valid email`
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
    
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }],

        user_type: {
            type: String,
            enum: ['basic', 'vendor', 'admin'],
            default: 'basic',
            required: true
        },

        active: {
            type: Boolean,
            default: true,
            required: true
        }
    }
);

// send back only required data ==> overriding the method

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}



// UserSchema.methods.generateAuthToken = function() {
//     var user = this;
//     var access = 'auth';
//     var token = jwt.sign({_id:user._id.toHexString(), access}, 'mySecretValue').toString();
//     user.tokens.push({
//         access,
//         token
//     });

//     // returning a promise
//     return user.save().then(() => {
//         return token;
//     });
// };

// adding model method instead of instance method
// UserSchema.statics.findByToken = function(token){
//     var User = this;
//     var decoded;

//     try{
//        decoded = jwt.verify(token,'mySecretValue');
//     }catch(e){
//         // a reject promise
//         return new Promise( (resolve, reject) => {
//             reject();
//         });

//         // return Promise.reject('rejected');
//     }

//     return User.findOne({
//         '_id': decoded._id,
//         'tokens.token': token,
//         'tokens.access': 'auth'
//     });
// };

// UserSchema.statics.findByCredentials = function(email, password){
//     var User = this;
//     return User.findOne({
//         email
//     }).then( (user) => {
//         if(!user){
//             return Promise.reject();
//         }
        
//         // bcrypt only supports callbacks, not promises, so..
//         return new Promise( (resolve, reject) => {
//             bcrypt.compare(password, user.password, (err, res) => {
//                 if(res){
//                     resolve(user);
//                 }else{
//                     reject();
//                 }
//             });
//         });
//     });
// }

// UserSchema.methods.removeToken = function(token) {
//     // $pull removes the certain item from array that matches the criteria
//     var user = this;
//     return user.update({
//         $pull: {
//             tokens: {
//                 token: token
//             }
//         }
//     });
// }

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// attaching mongoose events --> mongoose middleware

UserSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};