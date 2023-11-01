const chartController = require("../controllers/chartController");

const router = require("express").Router();

//get all
router.get("/", chartController.getChart);


module.exports = router;
