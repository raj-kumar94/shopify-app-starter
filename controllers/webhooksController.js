const verifyShopifyWebhook = require('../middlewares/verifyWebhooks');

exports.productUpdate = (req, res) => {
  /**
   * shopify-api-node object
   */
  let shopify = ShopifyConfig.getAny();
  let status = verifyShopifyWebhook(req, res); // immediately sends 200 or 401 status, so don't send response again
  if(!status){
      console.log('cannot verify request');
      return;
  }
  // do your stuffs here
}