let axios = require("axios")

let sortedCities=async function(req,res){

    try{
        let cities=["Bengaluru","Mumbai","Delhi","Kolkata","Chennai","London","Moscow"]
        let cityObjArray=[]

    for(let i=0 ; i<cities.length; i++){

        let obj={city: cities[i] }
        let resp= await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=68718d95ed604113358efe108c0dac67`)
   
   console.log(resp.data.main.temp)
   obj.temp=resp.data.main.temp
cityObjArray.push(obj)   
   
   
    }

    let sorted=cityObjArray.sort( function(a,b) { return a.temp - b.temp})
    console.log(sorted)
    res.status(200).send({status: true,data: sorted})

 }catch(error){
    console.log(error)
    res.status(500).send({status: false, msg: "server error"})
 }
}


module.exports.sortedCities=sortedCities