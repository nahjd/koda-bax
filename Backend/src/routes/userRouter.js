const router = require("express").Router();

const Usercontrollers = require("./../controllers/userControllers");

router.get("/bye", Usercontrollers.getAllID);
router.delete("/bye/:id", Usercontrollers.getDelete);
router.post("/bye", Usercontrollers.getPost);

module.exports = router;
