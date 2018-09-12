const dotenv = require('dotenv').config();
// const Shopify = require('shopify-api-node');
require('./shopifyAppSetting');

const shopify = ShopifyConfig.getMain();

function registerWebhooks_(topic) {
    let webhookEndpoint = topic.replace("/", "-");
    let address = `${baseUrl}/webhooks/${webhookEndpoint}`;
    return shopify.webhook.create({
        "topic": topic,
        "address": address,
        "format": "json"
    });
  }

function listWebhooks_() {
    return shopify.webhook.list();
  }

async function registerWebhooks(args){
    for(let i=0; i<args.length; i++) {
        if(args[i] === 'list'){
            try{
                let result = await listWebhooks_();
                console.log(result);
            }catch(err){
                console.log(err);
                break;
            }
        }
        else{
            try{
                let result = await registerWebhooks_(args[i]);
                console.log(result);
            }catch(err){
                console.log(err);
                break;
            }
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



