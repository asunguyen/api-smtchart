const userController = require("../controllers/userController");

const router = require("express").Router();

//get all
router.get("/", userController.getAllUser);
router.get("/get-info", userController.getInfo);
router.get("/get-employ", userController.getAllEmploy);
router.delete("/:id", userController.deleteUser);
router.post("/change-password", userController.changePass);

module.exports = router;
