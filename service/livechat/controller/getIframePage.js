const model = require('../models/getIframePage');
const appRoot = require('app-root-path');

module.exports = async (req, res, next) => {
  try {
    const accessKey = req.params.access_key;
    const result = await model(accessKey);
    console.log(result);

    if (!result) {
      return res.send("Not Allowed")
    } else {
      return res.sendFile(appRoot + "/client/" + result.html_key + "/" + result.alias + ".html");
    }
    // return res.json(result);
  } catch (error) {
    return res.json(error)
  }
}