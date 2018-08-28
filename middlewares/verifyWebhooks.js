var crypto = require('crypto');

function verifyShopifyHook(req) {
    var message = req.rawBody;
    var digest = crypto.createHmac('SHA256', SHOPIFY_SHARED_SECRET)
            .update(message)
            .digest('base64');    
    return digest === req.headers['x-shopify-hmac-sha256'];
  }


function verifyShopifyWebhook(req, res) {
    if (verifyShopifyHook(req)) {
        console.log('verified');
        res.status(200).send({});
        return true;
    } else {
        console.log('unverified');
        res.status(401).send({});
        return false;
    }
}

module.exports = verifyShopifyWebhook;

