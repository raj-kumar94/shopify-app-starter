const dotenv = require('dotenv').config();
const Shopify = require('shopify-api-node');

let shopify1 = undefined;
let shopify2 = undefined;
let shopify3 = undefined;

let autoLimit = { calls: 2, interval: 1000, bucketSize: 35 };
const STORE_TYPE = process.env.STORE_TYPE;
if(STORE_TYPE == "gold" || STORE_TYPE == "plus"){
    autoLimit.bucketSize = 75;
}

if(process.env.DEPOLOYMENT === 'production'){
    const {
        ONE_PRODUCTION_SHOP_NAME,
        ONE_PRODUCTION_SHOPIFY_API_KEY,
        ONE_PRODUCTION_SHOPIFY_API_SECRET,
        ONE_PRODUCTION_SHOPIFY_SHARED_SECRET,
        ONE_PRODUCTION_BASE_URL,
        TWO_PRODUCTION_SHOP_NAME,
        TWO_PRODUCTION_SHOPIFY_API_KEY,
        TWO_PRODUCTION_SHOPIFY_API_SECRET,
        TWO_PRODUCTION_SHOPIFY_SHARED_SECRET,
        TWO_PRODUCTION_BASE_URL,
        THREE_PRODUCTION_SHOP_NAME,
        THREE_PRODUCTION_SHOPIFY_API_KEY,
        THREE_PRODUCTION_SHOPIFY_API_SECRET,
        THREE_PRODUCTION_SHOPIFY_SHARED_SECRET,
        THREE_PRODUCTION_BASE_URL
    } = process.env;
    
    global.SHOPIFY_SHARED_SECRET = ONE_PRODUCTION_SHOPIFY_SHARED_SECRET;
    
    shopify1 = new Shopify({
        shopName: ONE_PRODUCTION_SHOP_NAME,
        apiKey: ONE_PRODUCTION_SHOPIFY_API_KEY,
        password: ONE_PRODUCTION_SHOPIFY_API_SECRET,
        autoLimit: autoLimit
    });
    
    if(TWO_PRODUCTION_SHOPIFY_API_KEY) {
        shopify2 = new Shopify({
            shopName: TWO_PRODUCTION_SHOP_NAME,
            apiKey: TWO_PRODUCTION_SHOPIFY_API_KEY,
            password: TWO_PRODUCTION_SHOPIFY_API_SECRET,
            autoLimit: autoLimit
        });
    }
    
    if(THREE_PRODUCTION_SHOPIFY_API_KEY) {
        shopify3 = new Shopify({
            shopName: THREE_PRODUCTION_SHOP_NAME,
            apiKey: THREE_PRODUCTION_SHOPIFY_API_KEY,
            password: THREE_PRODUCTION_SHOPIFY_API_SECRET,
            autoLimit: autoLimit
        });
    }
}else{
    const {
        TEST_SHOP_NAME,
        TEST_SHOPIFY_API_KEY,
        TEST_SHOPIFY_API_SECRET,
        TEST_SHOPIFY_SHARED_SECRET,
        TEST_BASE_URL
    } = process.env;

    global.SHOPIFY_SHARED_SECRET = TEST_SHOPIFY_SHARED_SECRET;

    shopify1 = new Shopify({
        shopName: TEST_SHOP_NAME,
        apiKey: TEST_SHOPIFY_API_KEY,
        password: TEST_SHOPIFY_API_SECRET
    });
}

function ShopConfig(shopify1, shopify2 = undefined, shopify3 = undefined) {
    this.shopify1 = shopify1;
    this.shopify2 = shopify2;
    this.shopify3 = shopify3;
}


ShopConfig.prototype.getAny = function() {
    let shopify1 = this.shopify1;
    let shopify2 = this.shopify2;
    let shopify3 = this.shopify3;

    // if(shopify1 && shopify1.callLimits.remaining == undefined) return shopify1;
    // else if(shopify2 && shopify1.callLimits.remaining == undefined) return shopify2;
    // else if(shopify3 && shopify1.callLimits.remaining == undefined) return shopify3;
    if(shopify1 && shopify1.callLimits.remaining == undefined) {
        console.log('shopify1 is serving')
        return shopify1;
    }
    else if(shopify2 && shopify2.callLimits.remaining == undefined){
        console.log('shopify2 is serving')
        return shopify2;
    }
    else if(shopify3 && shopify3.callLimits.remaining == undefined){
        console.log('shopify3 is serving')
        return shopify3;
    }

    // console.log(shopify1.callLimits);
    // console.log(shopify2.callLimits);
    // console.log(shopify3.callLimits);
    console.log('competetion is high!!');
    if(shopify1 && shopify2 && shopify3) {
        return (
            (shopify1.callLimits.remaining > shopify2.callLimits.remaining && shopify1.callLimits.remaining > shopify3.callLimits.remaining) 
            ? shopify1 
            : ( shopify2.callLimits.remaining > shopify3.callLimits.remaining ) ? shopify2 : shopify3
        );
    } else if(shopify1 && shopify2 && !shopify3) {
        return shopify1.callLimits.remaining > shopify1.callLimits.remaining ? shopify1 : shopify2;
    } else {
        return shopify1;
    }
}

ShopConfig.prototype.getMain = function() {
    return this.shopify1;   
}

  
global.ShopifyConfig = new ShopConfig(shopify1, shopify2, shopify3);

// console.log(ShopiftConfig_.getAny());

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * A simple method to check the strength of using multiple private apps
*/

/*
async function testMe() {
    for(let i=0; i<100; i++) {
        let shopify = ShopifyConfig.getMain();
        console.log(shopify.callLimits);
        // console.log(shopify.options.apiKey);
        shopify.customer.count()
        .then( data => console.log(data))
        .catch( err => console.log(err));

        if(i%20 == 0) {
            await sleep(2000);
        }
    }
}

// testMe();

*/

// module.exports = {baseUrl, shop_name, shopify_api_key, shopify_api_secret, shopify_api_shared_secret};