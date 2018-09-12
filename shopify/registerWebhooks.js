const dotenv = require('dotenv').config();
// const Shopify = require('shopify-api-node');
require('./shopifyAppSetting');

const shopify = ShopifyConfig.getMain();

function registerWebhooks_(topic) {
    let webhookEndpoint = topic.replace("/", "-");
    let address = `${BASE_URL}/webhooks/${webhookEndpoint}`;
    return shopify.webhook.create({
        "topic": topic,
        "address": address,
        "format": "json"
    });
  }

function deleteWebhook(id) {
    return shopify.webhook.delete(id);
}

function listWebhooks_() {
    return shopify.webhook.list();
  }

async function registerWebhooks(args){
    // console.log(args.length);return;
    for(let i=0; i<args.length; i++) {
        // console.log(args[i]);
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
                // console.log(err);
                console.log('Error; statusCode: ', err.statusCode);
                // break;
            }
        }
    }    
}


async function deleteWebhooks(args){
    // console.log(args);return;
    for(let i=1; i<args.length; i++) {
        try{
            let result = await deleteWebhook(args[i]);
            console.log(result);
        }catch(err){
            console.log('Error; statusCode: ', err.statusCode);
        }
    }    
}

var args = process.argv.slice(2);
if(args.length){
    if(args[0] == 'delete') {
        deleteWebhooks(args);
    }else{
        registerWebhooks(args);
    }
}else{
    console.log(`arguments are missing.
        use below syntax: 
        node server/shopify/registerWebhooks.js orders/fulfilled orders/cancelled orders/create orders/updated

        listing registered webhooks:
        node server/shopify/registerWebhooks.js list

        Delete a webhook:
        node server/shopify/registerWebhooks.js delete 356209360953, 356209360954
    `);
}

