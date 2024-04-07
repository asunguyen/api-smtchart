const OrderController = require("../controllers/orderController");
const router = require("express").Router();
router.post("/payment", OrderController.createOrder);

module.exports = router;