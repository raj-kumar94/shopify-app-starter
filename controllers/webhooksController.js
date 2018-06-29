const Shopify = require('shopify-api-node');
var {baseUrl, shop_name, shopify_api_key, shopify_api_secret, shopify_api_shared_secret} = require('../shopify/shopifyAppSetting');


const shopify = new Shopify({
  shopName: shop_name,
  apiKey: shopify_api_key,
  password: shopify_api_secret
});


exports.productUpdate = (req, res) => {
  shopify.webhook.create({
        "topic": "products/update",
        "address": baseUrl+"/marmeto/webhooks/product-update",
        "format": "json"
    }).then( (created) => {
    res.send(created);
    console.log(created);
    }).catch( (err) => {
    // res.send(err);
    console.log(err);
    });
}
