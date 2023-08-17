const jwt = require('jsonwebtoken');
const checkOldTokens = require('../utils/checkOldTokens');
const promisify = require('util').promisify;
const User = require('../models/userModel');

const protect = async(req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", ""); // Bearer kısmını kaldır
    if (!token) {
      return res.status(401).json({
        succeded: false,
        error: "User not authenticated",
      });
    }
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decode.id);
      if (!currentUser) {
        return res.status(401).json({
          succeded: false,
          error: "User no longer exist",
        });
      }
      let oldTokens = currentUser.tokens || [];
      if (oldTokens.length) {
        const tokenList = await checkOldTokens(oldTokens);
        if (!tokenList.length) {
          return res.status(401).json({
            succeded: false,
            error: "User not authenticated",
          });
        }
  
        const checkTokenExist = tokenList.find((t) => t.token === token);
        if (!checkTokenExist) {
          return res.status(401).json({
            succeded: false,
            error: "User not authenticated",
          });
        }
      } else {
        return res.status(401).json({
          succeded: false,
          error: "User not authenticated",
        });
      }
    req.body.userId = decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

module.exports = { protect };


