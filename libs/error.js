const to = require("await-to-js");

const errorResponse = async cb => {
  let error;
  let success;

  [err, result] = await to(cb);

  if (err) {
    error.statusCode = 422;
    error.message = err;
    return err;
  }

  success.statusCode = 200;
  success.message = result;
  return success;
};

module.exports = { errorResponse };
