const express = require("express");
const router = express.Router();
const { getUserDetails } = require("../controllers/private");
// const { isLoggedIn } = require("../middleware/auth")

router.route("/me").get(getUserDetails);

module.exports = router;