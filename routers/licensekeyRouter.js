const licenseKeyController = require("../controllers/licensekeyController");

const router = require("express").Router();

//get all
router.get("/", licenseKeyController.getAll);
router.get("/:id", licenseKeyController.getDetail);
router.post("/create", licenseKeyController.createLicense);
router.post("/active", licenseKeyController.active);
router.post("/create-by-admin", licenseKeyController.createLicenseByAdmin);
router.post("/use-license", licenseKeyController.userLicense);

module.exports = router;