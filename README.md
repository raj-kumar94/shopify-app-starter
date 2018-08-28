
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

# Multiple private apps to boost performance and avoid too many request

We can have multiple private app used for a single store. You can configure upto 3 apps in .env file

if `DEPOLOYMENT = production` in .env file, then it will use upto 3 private apps you set up in .env file otherwise a single app will be used

# webhooks

## Registering a webhook

```
node shopify/registerWeboks.js products/update
```

## Listing registered webhooks

## verifying webhooks

```
node shopify/registerWeboks.js list
```


```
const verifyShopifyWebhook = require('../middlewares/verifyWebhooks');
let status = verifyShopifyWebhook(req, res); // immediately sends 200 or 401 status, so don't send response again
if(!status){
    console.log('cannot verify request');
    return;
}
```


# User/session management 

## Checking user session

```
var sessionChecker = require('./middlewares/sessionChecker');
```
then in a route

```
app.get('/profile',sessionChecker, (req, res) => {
  res.redirect('/user/login');
}); 
```
