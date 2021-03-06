const User = require("../model/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @Desc Register a new User
// @Route POST /api/v1/users/signup
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
// @Route POST  /api/v1/users/login
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  //check if fields are empty
  if (!username || !password) return next(new ErrorResponse("Please enter username and password", 401));

  //check if  username match
  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorResponse("Invalid Username or Password", 401));

  // check if password match
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorResponse("Invalid Username or Password", 401));

  // If request passes every validation
  sendTokenResponse(user, 200, res);
});

//Send token and user data to the Client
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

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

  res.status(statusCode).json({
    data,
    token
  });
};

// @Desc Get all Sellers
// @Route GET /api/v1/users/getAllSellers
// @access Public
exports.getAllSellers = asyncHandler(async (req, res, next) => {
  const sellers = await User.find({ typeOfUser: "seller" });

  res.status(200).json({ data: sellers });
});

// @Desc Get the nearest Sellers by a certain distance
// @Route GET /api/v1/users/getNearestSellers?:longitude&:latitude&:maxDistance
// @access Public
exports.getNearestSellers = asyncHandler(async (req, res, next) => {
  //Fetch the coordinates and the maximum distance from the request query
  const longitude = req.query.longitude;
  const latitude = req.query.latitude;
  const maxDistance = req.query.maxDistance;

  //Calculate radius to find the closest distance
  ///Divide maxDistance provided BY earth's radius
  // earth's radius is 6,378 km
  const radius = maxDistance / 6378;

  //Search the database with the calculated params
  const sellers = await User.find({
    typeOfUser: "seller",
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] }
    }
  });

  res.status(200).json({ data: sellers });
});
