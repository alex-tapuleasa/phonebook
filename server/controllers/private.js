const { authorize } = require('passport');

const {isLoggedIn} = require('../middleware/auth');


exports.getUserDetails = (isLoggedIn, (req, res, next) => {
  res.send(req.user)
  
  });