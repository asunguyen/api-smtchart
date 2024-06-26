const OrderController = require("../controllers/orderController");
const router = require("express").Router();
router.post("/payment", OrderController.createOrder);
router.post("/paymentSS", OrderController.updateOrder);

module.exports = router;