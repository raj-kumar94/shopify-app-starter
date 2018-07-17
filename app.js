const path = require("path");
const http = require("http");
const publicPath = path.join(__dirname,'/public');
const port = process.env.PORT || 4000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const hbs = require('hbs');
var cors = require('cors');
var helmet = require('helmet')

const express = require("express");
var session = require('express-session');



var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/loyalty-shopify');

var app = express();

app.set('trust proxy', 'loopback');



// to verify shopify webhooks, raw body is required
// use this middleware before using bodyParser
app.use(function(req, res, next) {
  req.rawBody = '';

  req.on('data', function(chunk) { 
    req.rawBody += chunk;
  });

  next();
});


// adding security middleware
app.use(helmet());

app.use(cors({
  origin: '*',
  withCredentials: false,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Content-Type-Options', 'X-Frame-Options', 'Accept', 'Origin']
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




// app.use(express.bodyParser());

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000*100
  }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = require('./middlewares/sessionChecker');

// for static files
app.use('/public',express.static(publicPath));

hbs.registerPartials(__dirname + '/views/partials')

// nodemon server/server.js will look for views directory parallel to server folder
// nodemon server.js will look for views directory parallel to server.js file
// app.set('views', './../views');
app.set('view engine', 'hbs');

hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

const accessControlAllow = require('./middlewares/accessControlAllow');
app.use(accessControlAllow.allow);

const registerWebhooks = require('./routes/webhook');
app.use('/webhooks', registerWebhooks);


const users = require('./routes/user');
app.use('/user', users);


const order = require('./routes/order');
app.use('/order', order);


// public app end points

// const salesApp = require('./shopify/publicApp');
// app.get('/shopify', salesApp.shopify);
// app.get('/shopify/callback', salesApp.callback);


app.get('/dashboard',sessionChecker, (req, res) => {
  res.send('Some dashboard content');
}); 


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});