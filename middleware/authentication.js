const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Invalid Authorization");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
    };
    // altrnate way
    // const user = await User.findById(payload.userId).select("-password");
    // req.user = user;
    next();
  } catch (err) {
    throw new UnauthenticatedError("Invalid Authorization");
  }
};

module.exports = auth;
