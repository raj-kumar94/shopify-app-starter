# verifying webhooks

```
const verifyShopifyWebhook = require('../middlewares/verifyWebhooks');
let status = verifyShopifyWebhook(req, res); // immediately sends 200 or 401 status, so don't send response again
if(!status){
    console.log('cannot verify request');
    return;
}

```

# using shopify api (official module)

```
const Shopify = require('shopify-api-node');

var {baseUrl, shop_name, shopify_api_key, shopify_api_secret, shopify_api_shared_secret} = require('../shopify/shopifyAppSetting');

const shopify = new Shopify({
  shopName: shop_name,
  apiKey: shopify_api_key,
  password: shopify_api_secret
});

// public app

// const shopify = new Shopify({
//   shopName: shop_name,
//   accessToken: accessToken
// });

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

# Registering webhooks
```
node shopify/registerWeboks.js products/update
```

# Checking user session

```
var sessionChecker = require('./middlewares/sessionChecker');
```
then in a route

```
app.get('/profile',sessionChecker, (req, res) => {
  res.redirect('/user/login');
}); 
```
