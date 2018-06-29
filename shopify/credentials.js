const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_product_listings,write_checkouts,read_products,read_checkouts,read_orders,read_draft_orders';
const forwardingAddress = process.env.PRODUCTION_BASE_URL; // Replace this with your HTTPS Forwarding address

module.exports = {
    apiKey,
    apiSecret,
    scopes,
    forwardingAddress
}
