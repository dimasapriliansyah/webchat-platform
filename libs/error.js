const to = require("await-to-js");

const errorResponse = (statusCode,message,log) => {
  return {
    statusCode,
    message,
  }
};

module.exports = { errorResponse };
