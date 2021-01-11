const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "exceptionsHandler.log" })
  );

  process.on("uncaughtException", (exp) => {
    winston.error(exp.message, exp);
    process.exit(1);
  });
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(new winston.transports.Console());
  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: config.get("db"),
  //     level: "error",
  //   })
  // );
};
