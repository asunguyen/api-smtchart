
const BolocControler = require("../controllers/bolocCophieuController");
const router = require("express").Router();
router.post("/GetDataByFilter", BolocControler.GetDataByFilter);
router.get("/GetLatestIndices", BolocControler.thiTruongChuyenSauChiSo);
router.get("/GetIndexSeries", BolocControler.thiTruongChuyenSauChiSoDetail);
module.exports = router;