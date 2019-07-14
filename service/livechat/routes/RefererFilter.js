const cors = require("cors");
const router = require("express").Router();

// Import cors libraries for whitelisting domain.
const securingIframe = require("../../../libs/corsSecureIframe");
const getIframePage = require("../controller/getIframePage.js");

router.get("/:access_key", cors(securingIframe), getIframePage);

module.exports = router;