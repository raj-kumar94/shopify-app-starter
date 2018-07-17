var crypto = require('crypto');

function verifyShopifyHook(req, accessToken='') {
    // console.log(req.body);
    var shopify_api_shared_secret = '';
    if(accessToken){
        shopify_api_shared_secret = accessToken;
    }else{
        if(process.env.DEPOLOYMENT === 'production'){
            shopify_api_shared_secret = process.env.PRODUCTION_SHOPIFY_SHARED_SECRET;
        }else{
            shopify_api_shared_secret = process.env.TEST_SHOPIFY_SHARED_SECRET;
        }
    }
    
    var message = req.rawBody;
    var digest = crypto.createHmac('SHA256', shopify_api_shared_secret)
            .update(message)
            .digest('base64');
    // console.log(req);
    // console.log('header = '+req.headers['x-shopify-hmac-sha256']);
    // console.log('digest = '+digest);        
    return digest === req.headers['x-shopify-hmac-sha256'];
  }


function verifyShopifyWebhook(req, res, accessToken = '') {
    if (verifyShopifyHook(req, accessToken)) {
        res.writeHead(200);
        console.log('verified');
        res.end('Verified webhook');
        return true;
    } else {
        res.writeHead(401);
        console.log('unverified');
        res.end('Unverified webhook');
        return false;
    }
}

module.exports = verifyShopifyWebhook;

