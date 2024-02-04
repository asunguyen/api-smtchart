const ChartTradingViewController = require("../controllers/chartTradingViewController");

const router = require("express").Router();

//get all
router.get("/history", ChartTradingViewController.historyChart);
router.get("/search", ChartTradingViewController.searchSymbol);
router.get("/template", ChartTradingViewController.getTemplate);
router.get("/bot-scrape/1.1/study_templates", ChartTradingViewController.getBotTemplate);
router.get("/bot-scrape/1.1/charts", ChartTradingViewController.getBotTemplate);

// save chart
router.post("/dashboard/1.1/charts", ChartTradingViewController.saveChartDashboard);
router.post("/pt1m/1.1/charts", ChartTradingViewController.saveChartpt1m);
router.post("/ai/1.1/charts",ChartTradingViewController.saveChartai);
router.post("/pttrend/1.1/charts", ChartTradingViewController.saveChartpttrend);
router.post("/pt3m/1.1/charts", ChartTradingViewController.saveChart_pt3m);
router.post("/csfree/1.1/charts", ChartTradingViewController.saveChart_csfree);
router.post("/cstplus/1.1/charts", ChartTradingViewController.saveChart_cstplus);
router.post("/cstrend/1.1/charts", ChartTradingViewController.saveChart_cstrend);

//get chart
router.get("/dashboard/1.1/charts", ChartTradingViewController.getChartDashboard);
router.get("/pt1m/1.1/charts",ChartTradingViewController.getChartpt1m);
router.get("/ai/1.1/charts", ChartTradingViewController.getChartai);
router.get("/pttrend/1.1/charts", ChartTradingViewController.getChartpttrend);
router.get("/pt3m/1.1/charts", ChartTradingViewController.getChartpttrend);
router.get("/csfree/1.1/charts", ChartTradingViewController.getChart_pt3m);
router.get("/cstplus/1.1/charts", ChartTradingViewController.getChart_cstplus);
router.get("/cstrend/1.1/charts", ChartTradingViewController.getChart_cstrend);


module.exports = router;