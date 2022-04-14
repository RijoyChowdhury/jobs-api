const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body }); //mongoose validation check
  const token = user.generateToken();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: req.body.name }, token });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new BadRequestError("Password/Email not provided");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const passwordMatch = await user.verifyPassword(password);
  if (!passwordMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.generateToken();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
