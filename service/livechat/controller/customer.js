const model = require('../models/customer.js');

const checkSession = async (req, res, next) => {
  if (!req.session.convId) {
    next();
  } else {
    return res.json({ result: req.session.convId })
  }
}

const register = async (req, res, next) => {
  try {
    let data = req.body
    const result = await model.register(data);
    if (result != "error") {
      req.session.convId = result;
      return res.json({ result });
    }
    return res.status(422).json({ result: "error" })
  } catch (error) {
    return res.status(422).json({ result: "error" })
  }

}

exports.register = register
exports.checkSession = checkSession 