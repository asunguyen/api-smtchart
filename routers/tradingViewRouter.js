const ChartTradingViewController = require("../controllers/chartTradingViewController");

const router = require("express").Router();

//get all
router.get("/history", ChartTradingViewController.historyChart);
router.get("/search", ChartTradingViewController.searchSymbol);
router.get("/template", ChartTradingViewController.getTemplate);
router.get("/bot-scrape/1.1/study_templates", ChartTradingViewController.getBotTemplate);
router.get("/bot-scrape/1.1/charts", ChartTradingViewController.getBotTemplate);


module.exports = router;