const dotenv = require('dotenv').config();
const Shopify = require('shopify-api-node');
var {baseUrl, shop_name, shopify_api_key, shopify_api_secret, shopify_api_shared_secret} = require('../shopify/shopifyAppSetting');


const shopify = new Shopify({
  shopName: shop_name,
  apiKey: shopify_api_key,
  password: shopify_api_secret
});


function productUpdate(req, res) {
  return new Promise( (resolve, reject) => {
    shopify.webhook.create({
        "topic": "products/update",
        "address": baseUrl+"/webhooks/product-update",
        "format": "json"
    })
    .then( (created) => {
        resolve(created);
    })
    .catch( (err) => {
        reject(err);
    });
  });
}

function productDelete(req, res) {
    return new Promise( (resolve, reject) => {
      shopify.webhook.create({
          "topic": "products/delete",
          "address": baseUrl+"/webhooks/product-delete",
          "format": "json"
      })
      .then( (created) => {
          resolve(created);
      })
      .catch( (err) => {
          reject(err);
      });
    });
}

function productCreate(req, res) {
    return new Promise( (resolve, reject) => {
      shopify.webhook.create({
          "topic": "products/create",
          "address": baseUrl+"/webhooks/product-create",
          "format": "json"
      })
      .then( (created) => {
          resolve(created);
      })
      .catch( (err) => {
          reject(err);
      });
    });
}



async function registerWebhooks(args){
    for(let i=0; i<args.length; args++) {
        if(args[i] === 'products/update'){
            try{
                let result = await productUpdate();
                console.log(result);
            }catch(err){
                console.log(err);
                break;
            }
            // let result = await productUpdate();
            // console.log(result);
        }
    }    
}

var args = process.argv.slice(2);
if(args.length){
    registerWebhooks(args);
}else{
    console.log(`arguments are missing.
        use below syntax: 
        node shopify/registerWebhooks.js products/update products/create
    `);
}



