const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

mongoose.set("useFindAndModify", false);

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      winston.Console(`Connected to mongoDb: ${db}`);
    })
    .catch((error) => {});
};
