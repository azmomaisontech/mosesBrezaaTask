const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getAllSellers, getNearestSellers } = require("../controller/users");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/getAllSellers", getAllSellers);
router.get("/getNearestSellers", getNearestSellers);

module.exports = router;
