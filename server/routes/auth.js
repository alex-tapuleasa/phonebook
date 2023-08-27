const express = require("express");
const router = express.Router();

const {
    register,
    login,
    refreshToken,
    logout 
} = require("../controllers/auth")

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refreshtoken').post(refreshToken);
router.route('/logout').get(logout);

module.exports = router;