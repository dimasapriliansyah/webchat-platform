const logger = require("./logger");
const db = require('../connection/database')

const queryApiKey = (referer) => {
    logger.silly("referer: ", referer)

    return db
        .select("id")
        .from("api_key")
        .where("referer", "=", referer)
        .limit(1)
        .orderBy("lup", "desc")
        .on('query', (data) => {
            logger.silly(data);
        })
        .then(result => {
            if (result.length < 1) {
                return false;
            } else {
                return true;
            }
        })
        .catch(error => {
            logger.info({ ctx: "queryApiKey", sqlMessage: error.sqlMessage, referer })
            return false
        });
}

const whitelist = async (req, callback) => {

    const referer = req.headers.referer || "false";
    const result = await queryApiKey(referer);

    if (result) {
        return callback(null, { origin: true });
    }

    corsOptions = { origin: false };
    return callback("Not Allowed");

};

module.exports = whitelist;