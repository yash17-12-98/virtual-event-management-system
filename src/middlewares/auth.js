const jwt = require("jsonwebtoken");
const User = require("../models/user");

function extractToken(req) {
  if (req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }
  return req.headers.authorization;
}

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    return jwt.verify(
      extractToken(req),
      process.env.API_SECRET,
      (err, decode) => checkUserIsAuthenticated(req, res, next, err, decode)
    );
  }
  return res
    .status(401)
    .json({ status: "error", message: "Token verification failed" });
};

const checkUserIsAuthenticated = (req, res, next, err, decode) => {
  if (err) {
    return res
      .status(401)
      .json({ status: "error", message: "Token verification failed" });
  }
  console.log("Decoded Id ", decode.id);

  User.findOne({ _id: decode.id })
    .then((user) => {
      console.log("Verified User", user);
      req.user = user;
      req.message = "User find successfully";
      return next();
    })
    .catch((err) => {
      console.log("Error", err);
      return res
        .status(401)
        .json({ status: "error", message: "Token verification failed" });
    });
};

const checkAuthoriseUserAccess = (req, res, next) => {
  console.log("User Authorised request", req.user);
  if (req.user.role === "Event organizer") {
    return next();
  }

  return res
    .status(403)
    .json({ status: "error", message: "User authoriation failed" });
};

module.exports = { verifyToken, checkAuthoriseUserAccess };
