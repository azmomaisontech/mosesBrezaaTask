const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { addReview, getReview } = require("../controller/reviews");

router.post("/", protect, authorize("client"), addReview);
router.get("/getSellerReviews", getReview);

module.exports = router;
