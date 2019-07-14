const router = require("express").Router();

const controller = require('../controller/customer');

router.post("/register", controller.register)

module.exports = router;