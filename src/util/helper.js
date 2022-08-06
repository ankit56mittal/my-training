 
 let result1=function(){
 let date = new Date().getMonth()+1
  let month = new Date().getDate()
  let year = new Date().getFullYear()
 console.log(`today date is ${date}/${month}/${year}`) }

  
 
 let info= function getBatchInfo() {
    console.log(" plutonium, W3D5, the topic for today is Nodejs module system")
 }
 module.exports.result1 =result1;
 module.exports.info =info;
 // module.exports.result1 =month;
  //module.exports.result1 =year;