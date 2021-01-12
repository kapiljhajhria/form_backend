const winston = require("winston");

module.exports = function error(err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).send("something went wrong");
};