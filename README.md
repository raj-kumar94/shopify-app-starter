
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
node shopify/registerWeboks.js products/update
```

## Listing registered webhooks

```
node shopify/registerWeboks.js list
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


# User Routes

If you're building a CMS, you would probably require to make user management as well

## routes

```
GET /user/login
GET /user/signup
POST /user/logout
```

if `/user/logout` is not availale, then add `SIGNUP = yes` in your .env file

## middleware to check if user is an Admin

```
var {isAdmin} = require('./middlewares/sessionChecker');
```
then in a route

```
router.get('/', isAdmin, usersController.home);
```

# Protecting forms

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

And in your form

```
<form ...>
  <input type="hidden" name="_csrf" value="{{csrfToken}}">
</form>
```