
exports.orders = (req, res) => {
  let shopify = ShopifyConfig.getAny();
  console.log(shopify.callLimits);
  shopify.order.list({limit:1})
    .then( (order) => {
      res.send(order)
    })
    .catch( (err) => {
      res.send(err);
    });
}