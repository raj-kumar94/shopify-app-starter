
# using shopify api (official module)

```
require('../shopify/shopifyAppSetting');

let shopify = ShopifyConfig.getAny();

exports.orders = (req, res) => {
  shopify.order.list({limit:1})
    .then( (order) => {
      res.send(order)
    })
    .catch( (err) => {
      res.send(err);
    });
}
```

> Note: copy .env.example to .env and update values

# Multiple private apps to boost performance and avoid too many requests

We can have multiple private app used for a single store. You can configure upto 3 apps in .env file

if `DEPOLOYMENT = production` in .env file, then it will use upto 3 private apps you set up in .env file otherwise a single app will be used

# webhooks

## Registering a webhook

```
node shopify/registerWeboks.js products/update products/create
```

## Listing registered webhooks

```
node shopify/registerWeboks.js list
```

## Other commands

Use this command to get all info

```
node shopify/registerWeboks.js
```

## What will be the endpoint of my webhooks ?

If you registered `products/create` webhook, enpoint will be:

```
POST /webhooks/products-update
```


## verifying webhooks

```
const verifyShopifyWebhook = require('../middlewares/verifyWebhooks');
let status = verifyShopifyWebhook(req, res); // immediately sends 200 or 401 status, so don't send response again
if(!status){
    console.log('cannot verify request');
    return;
}
```


# User/session management 

By default signed up user will be an Admin. If you want to add different types of users, consider editing `usersController.js`

# User Routes

If you're building a CMS, you would probably require to manage users as well

## routes

```
GET /user/login
GET /user/signup
POST /user/logout
```

if `/user/signup` is not availale, then add `SIGNUP=yes` in your .env file

## middleware to check if user is an Admin

```
var {isAdmin} = require('./middlewares/sessionChecker');
```
then in a route

```
router.get('/', isAdmin, usersController.home);
```

# Protecting forms with csrf token

```
const {csrfProtection} = require('../middlewares/csrfProtection');

router.get('/login',csrfProtection, usersController.getLogin);
```

and then in your handler

```
exports.getLogin = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        res.render('login.hbs', {title: "Login", csrfToken: req.csrfToken()});
    }
}
```

And `csrfToken` in your form

```
<form method="POST" action="/submit">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">
  .
  .
</form>
```

# Using Redis for user session

Why ?

If you're using express-session and using cluster mode with multiple node instances running, most likely your session management will fail. Either store session in database or use any fast in-memory database such as redis

- in your .env file add `REDIS=yes`

- you can configure further in `sessionChecker.js`

- install connect-redis package with command `npm install --save connect-redis`
