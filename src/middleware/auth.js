const jwt = require("jsonwebtoken");
const authenticate = function(req, res, next) {
    //check the token in request header
    try{
    
     let token = req.headers["x-Auth-token"];
        if (!token) token = req.headers["x-auth-token"];
      
        //If no token is present in the request header return error
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
      
        console.log(token);
        //validate this token
        let decodedToken = jwt.verify(token, "functionup-plutonium");
        if (!decodedToken) return res.status(401).send({  msg: "Authentication missing" });
           req.loginId =decodedToken.userId
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

    
    next()
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
  
try{
    let requestedId = req.params.userId;
    //   if(!requestedId) return res.status(400).send({msg:"reuested id is not there"})
    if( requestedId!==req.loginId){
        console.log(requestedId , req.loginId)
        return res.status(403).send({msg:" ForBidden"})
        
    }}
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

    next()
    // console.log(next())
}
 
module.exports.authenticate=authenticate
module.exports.authorise=authorise