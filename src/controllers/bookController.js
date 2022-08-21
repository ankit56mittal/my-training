const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publishermodel = require("../models/publishermodel")

 const createnewBook= async function (req, res) {
     let book = req.body
    if (!book.author)return res.send({msg:"authorid not given"})
    let checkauthorId= await authorModel.findById(book.author)

      if(!book.publisher)return res.send ({msg:"publisher id is required"})  
    let checkpublisherId = await publishermodel.findById(book.publisher)
     let bookCreated = await bookModel.create(book)
    
     res.send({data: bookCreated})
 }

  // const putBooksData= async function (req, res) {
  //    let books = await bookModel.update()
  //  res.send({data: books})
  // }

 const getBooksWithAuthorDetailspublisherdetails= async function (req, res) {
     let specificBook = await bookModel.find().populate('author').populate('publisher')
    res.send({msg: specificBook})
}
const putreq = async function(req,res){
  
  //  let updatebooks = await bookModel.updateMany({ { $or: [ { publisher. _id:"630111792583338b3f6edb2f" }, {publisher:{ objectId:""} ]},{$set:{price:500}},{new:true})
// let updatebooks=await bookModel.updateMany({"price" : 450}, { $set: { "ratings" : 3.5}},{new:true})

 res.send({msg:updatebooks})   }

// const books= async function (req, res) {
//   let specificBook = await bookModel.find().populate('author').populate('publisher')
//  res.send({msg: specificBook})

//  const config = { headers: {'Content-Type': 'application/json'} };
// axios.put(url, content, config).then(response => {
//     ...
// });

 module.exports.putreq=putreq
 module.exports.createnewBook= createnewBook
//  module.exports.getBooksData= getBooksData
  module.exports.getBooksWithAuthorDetailspublisherdetails = getBooksWithAuthorDetailspublisherdetails