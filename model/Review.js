const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewValue: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating from 1 to 5"]
  },
  comment: {
    type: String,
    required: [true, "Please enter some review comment"]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

//Prevent users from sending more than one review per seller
ReviewSchema.index({ seller: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
