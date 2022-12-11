const jwt = require("jsonwebtoken")


const authenticate = function (req, res, next) {
    try {
      const token = req.headers["authorization"] //brearer token
  
      // token validation.
      if (!token) {
        return res
          .status(400)
          .send({ status: false, message: "token must be present" });
        

      } else {
let splitToken= token.split(' ')
        jwt.verify(splitToken[1], "plutonium-63", function (err, data) {
          if (err) {
            return res.status(400).send({ status: false, message: err.message });
          } else {
            req.loginUserId = data.userId;
            next();
          }
        });
      }
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };

module.exports ={authenticate}
  