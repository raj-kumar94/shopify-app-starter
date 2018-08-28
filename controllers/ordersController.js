const Shopify = require('shopify-api-node');
var verifyShopifyWebhook = require('../middlewares/verifyWebhooks');

// var {baseUrl, shop_name, shopify_api_key, shopify_api_secret, shopify_api_shared_secret} = require('../shopify/shopifyAppSetting');

// public app

// const shopify = new Shopify({
//   shopName: shop_name,
//   accessToken: accessToken
// });

exports.orders = (req, res) => {
  let shopify = ShopifyConfig.getAny();
  console.log(shopify.callLimits);
  shopify.order.list({limit:1})
    .then( (order) => {
      res.send(order)
    })
    .catch( (err) => {
      res.send(err);
    });
}