var baseUrl = "";
var shop_name = "";
var shopify_api_key = "";
var shopify_api_secret = "";
var shopify_api_shared_secret = "";

if(process.env.DEPOLOYMENT === 'production'){
  baseUrl = process.env.PRODUCTION_BASE_URL;
  shop_name = process.env.PRODUCTION_SHOP_NAME;
  shopify_api_key = process.env.PRODUCTION_SHOPIFY_API_KEY;
  shopify_api_secret = process.env.PRODUCTION_SHOPIFY_API_SECRET;
  shopify_api_shared_secret = process.env.PRODUCTION_SHOPIFY_SHARED_SECRET;
}else{
  baseUrl = process.env.TEST_BASE_URL;
  shop_name = process.env.TEST_SHOP_NAME;
  shopify_api_key = process.env.TEST_SHOPIFY_API_KEY;
  shopify_api_secret = process.env.TEST_SHOPIFY_API_SECRET;
  shopify_api_shared_secret = process.env.TEST_SHOPIFY_SHARED_SECRET;
}


module.exports = {baseUrl, shop_name, shopify_api_key, shopify_api_secret, shopify_api_shared_secret};