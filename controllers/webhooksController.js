const Shopify = require('shopify-api-node');
const {baseUrl, shop_name, shopify_api_key, shopify_api_secret, shopify_api_shared_secret} = require('../shopify/shopifyAppSetting');
const verifyShopifyWebhook = require('../middlewares/verifyWebhooks');


const shopify = new Shopify({
  shopName: shop_name,
  apiKey: shopify_api_key,
  password: shopify_api_secret
});


exports.productUpdate = (req, res) => {
  let status = verifyShopifyWebhook(req, res); // immediately sends 200 or 401 status, so don't send response again
  if(!status){
      console.log('cannot verify request');
      return;
  }
  console.log('yo');
}