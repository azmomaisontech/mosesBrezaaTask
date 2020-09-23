const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Review = require("../model/Review");
const User = require("../model/User");

//@desc      Add a Review
//@route     POST /api/v1/review/?:sellerId/
//@access    Private/User-Client only
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.seller = req.query.sellerId;
  req.body.user = req.user.id;

  const seller = await User.findById(req.query.sellerId);

  if (!seller) return next(new ErrorResponse("There is no seller with that info", 404));

  const review = await Review.create(req.body);

  res.status(201).json({
    data: review
  });
});

//@desc      Get Reviews for a particular seller
//@route     GET /api/v1/review/getSellerReviews?:sellerId/
//@access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ seller: req.query.sellerId });

  res.status(200).json({
    data: reviews
  });
});
