const knex = require("./database/connection");

const whitelist = async(req, res, next) => {
    const remoteAddress = req.headers["x-real-ip"] || false;

    const referer = req.headers.referer || false;

    console.log("referer: ", referer);
    console.log("remoteAddress: ", remoteAddress);

    if (remoteAddress = '127.0.0.1' && !referer) {
        let info = { alias: "oct_dev", secret_key: "oct_dev" };
        req.htmlFilename = info;
        return next();
    }

    knex
        .select("alias", "secret_key")
        .from("tenants")
        .where("referer_url", "=", referer)
        .limit(1)
        .orderBy("lup", "desc")
        .then(result => {
            if (result.length < 1) {
                req.htmlFilename = false;
                next();
            } else {
                let { alias, secret_key } = result[0];
                let info = { alias, secret_key };
                req.htmlFilename = info;
                next();
            }
        })
        .catch(error => {
            next(error);
        });
};

const cors = async(req, callback) => {
    const isValidRequest = req.htmlFilename || false;

    let corsOptions;

    if (!isValidRequest) {
        corsOptions = { origin: false };

        return callback("Not Allowed");
    }

    corsOptions = { origin: true };
    return callback(null, corsOptions);
};

module.exports = { whitelist, cors };