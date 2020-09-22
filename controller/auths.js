const User = require("../model/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @Desc Register a new User
// @Route POST /api/v1/auth/regsiter
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, username, firstName, lastName, address, typeOfUser, profession } = req.body;

  const user = await User.create({
    email,
    password,
    username,
    firstName,
    lastName,
    address,
    typeOfUser,
    profession
  });

  sendTokenResponse(user, 201, res);
});

//Send cookie and user data to the Client
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      data: user,
      token
    });
};
