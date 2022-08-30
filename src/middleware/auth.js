const jwt = require("jsonwebtoken");
const authenticate = function(req, res, next) {
    //check the token in request header
    
    
     let token = req.headers["x-Auth-token"];
        if (!token) token = req.headers["x-auth-token"];
      
        //If no token is present in the request header return error
        if (!token) return res.send({ status: false, msg: "token must be present" });
      
        console.log(token);
        //validate this token
        let decodedToken = jwt.verify(token, "functionup-plutonium");
        if (!decodedToken)
          return res.send({ status: false, msg: "token is invalid" });
           req.loginId =decodedToken.userId

    next()
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
  

    let requestedId = req.params.userId;
    if(requestedId!==req.loginId){
        console.log(requestedId , req.loginId)
        return res.send({status:false,msg:" not allowed"})
    }

    next()
    // console.log(next())
}
 
module.exports.authenticate=authenticate
module.exports.authorise=authorise