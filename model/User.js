const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const geocoder = require("../utils/geocoder");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Please add a password"],
    select: false
  },
  username: {
    type: String,
    required: [true, "Please add a username"],
    unique: true
  },
  firstName: {
    type: String,
    required: [true, "Please add a first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"]
  },
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    //GeoJSON Point
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  },
  typeOfUser: {
    type: String,
    enum: ["seller", "client"],
    default: "client"
  },
  profession: {
    type: String
  }
});

//To hash a password before saving
UserSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//To return a JWT to the client after sign up/in
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

//To compare provided password with the hashed password in the DB on signin
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//GeoCoder
UserSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longiture, loc[0].latitude]
  };

  next();
});

module.exports = mongoose.model("User", UserSchema);
