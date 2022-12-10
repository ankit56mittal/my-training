const express = require("express");
const { default: mongoose } = require("mongoose");
const route = require("./routes/route");
const app = express();

app.use(express.json());

const url = "mongodb+srv://meenakshiSuryavanshi:ZVnFmXr4hAJCCKdL@cluster0.b80r4d1.mongodb.net/assignment"
const port = process.env.PORT || 3000;

mongoose.set('strictQuery', true);

mongoose.connect(url ,{ useNewUrlParser: true }, )

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
 
app.use("/", route);
// app.use(function(req, res, next){
//   res.setHeader('Access-Conrol-Allow-Origin', '*')
//   next()
// })

app.listen(port, function () {
  console.log("Express app running on port " + port);
})