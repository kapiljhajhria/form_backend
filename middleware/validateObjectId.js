const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  const validId = mongoose.isValidObjectId(req.params.id);
  if (!validId) {
    return res.status(404).send("invalid id");
  }
  next();
};
