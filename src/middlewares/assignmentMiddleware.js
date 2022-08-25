const logdata=async function(req ,res,next){

    console.log(new Date())
    next()


}
module.exports.logdata=logdata
