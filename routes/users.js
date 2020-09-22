const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getAllSellers } = require("../controller/users");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/getAllSellers", getAllSellers);

module.exports = router;
