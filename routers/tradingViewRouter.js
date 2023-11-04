const ChartTradingViewController = require("../controllers/chartTradingViewController");

const router = require("express").Router();

//get all
router.get("/history", ChartTradingViewController.historyChart);
router.get("/search", ChartTradingViewController.searchSymbol);
router.get("/template", ChartTradingViewController.getTemplate)

module.exports = router;