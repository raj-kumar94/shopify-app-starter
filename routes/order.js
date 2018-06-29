const express = require("express");
var router = express.Router();

const ordersController = require('../controllers/ordersController');

router.get('/', ordersController.orders);


module.exports = router;