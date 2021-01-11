const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }
  //if there is token, verify token

  try {
    const decoded = jwt.verify(token, config.get("crm_jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
