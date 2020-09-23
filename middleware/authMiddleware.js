const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  //Check if there is a token on the request header or cookie
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) return next(new ErrorResponse("Unauthorized Access", 401));

  // Check if the available token matches anything on the database
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Unauthorized Access", 401));
  }
});

//Limit certain functionality to only a category of user.
// e.g Only a client should be able to review
exports.authorize = (...type) => (req, res, next) => {
  if (!type.includes(req.user.typeOfUser)) {
    return next(new ErrorResponse(`You cannot perform this task`, 403));
  }

  next();
};
