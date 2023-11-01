const vimoController = require("../controllers/vimoController");

const router = require("express").Router();

//get all
router.get("/market", vimoController.marketTotal);
router.get("/top-10", vimoController.topTen);
router.get("/dinh-gia", vimoController.dinhGia);
router.get("/do-rong-thi-truong", vimoController.doRongThiTruong);
module.exports = router;
