const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    error: err.message || "Internal Server Error",
  };
  if (err.code && err.code === 11000) {
    customError.error = `Duplicate value for ${Object.keys(err.keyValue)}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name && err.name === "CastError") {
    customError.error = `No id exists with value ${err.value._id}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({ err: customError.error });
};

module.exports = errorHandlerMiddleware;
