// const jwt = require("jsonwebtoken");

// // const protect = async (req, res, next) => {
// //   try {
// //     const token = req.headers["authorization"].split(" ")[1];//authorizationun parantezlerini kaldır
// //     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
// //       if (err) {
// //         return res.status(200).send({
// //           message: "Auth Decode Fialed",
// //           success: false,
// //         });
// //       } else {
// //         req.body.userId = decode.id;
// //         next();
// //       }
// //     });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(401).send({
// //       message: "Auth Failed",
// //       success: false,
// //     });
// //   }
// // };
// const protect = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"].replace("Bearer ", ""); // Bearer kısmını kaldır
//     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res.status(401).send({
//           message: "Auth Decode Failed",
//           success: false,
//         });
//       } else {
//         req.body.userId = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       message: "Auth Failed",
//       success: false,
//     });
//   }
// };
// module.exports = {protect}


const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", ""); // Bearer kısmını kaldır
    const decode = jwt.verify(token, process.env.JWT_SECRET);
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