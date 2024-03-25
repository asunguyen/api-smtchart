
const BolocControler = require("../controllers/bolocCophieuController");
const router = require("express").Router();
router.post("/GetDataByFilter", BolocControler.GetDataByFilter)
module.exports = router;