const express = require("express");
var router = express.Router();

const webhooksController = require('../controllers/webhooksController');

router.post('/product-update', webhooksController.productUpdate);


module.exports = router;