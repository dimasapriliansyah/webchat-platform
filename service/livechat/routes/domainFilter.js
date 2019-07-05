const cors = require("cors");
const router = require("express").Router();
const appRoot = require('app-root-path');

// Import cors libraries for whitelisting domain.
const domainFilter = require("../../../libs/cors");

router.use(domainFilter.whitelist);

router.get("/", cors(domainFilter.cors), (req, res) => {
    let { secret_key } = req.htmlFilename;
    res.sendFile(appRoot + "/client/" + secret_key + ".html");
});

module.exports = router;