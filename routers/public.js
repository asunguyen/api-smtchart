const chartController = require("../controllers/chartController");

const router = require("express").Router();

//get all
router.get("/:symbol/:interval", chartController.getChart);
router.get("/config", chartController.config);
router.get("/time", chartController.time);
router.get("/symbols", chartController.symbols);
router.get("/history", chartController.history);
router.get("/search", chartController.search);
router.get("/all-exchanges", chartController.allExchanges);

module.exports = router;