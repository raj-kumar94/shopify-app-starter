const Shopify = require('shopify-api-node');
var verifyShopifyWebhook = require('../middlewares/verifyWebhooks');

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