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

// @Desc Login a new User
// @Route POST  /api/v1/auth/login
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  //check if fields are empty
  if (!username || !password) return next(new ErrorResponse("Please enter username and password", 401));

  //check if email address match
  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorResponse("Invalid Username or Password", 401));

  // check if password match
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorResponse("Invalid Username or Password", 401));

  // If request passes every validation
  sendTokenResponse(user, 200, res);
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

  const data = {
    id: user._id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    typeOfUser: user.typeOfUser,
    profession: user.profession,
    longitude: user.location.coordinates[0],
    latitude: user.location.coordinates[1]
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      data,
      token
    });
};
