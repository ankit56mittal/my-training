const { count } = require("console")
const BookModel= require("../models/bookModel")
const authorModel= require("../models/authorModel")

const creatAuthor= async function (req, res) {
    let data= req.body

    let savedData= await authorModel.create(data)
    res.send({msg: savedData})
}

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData = async function (req, res) {
    
    let authors = await authorModel.find({ author_name: "Chetan Bhagat"})
    
    let bookid = await BookModel.find({ author_id: { $eq: authors[0].author_id}})
    
    res.send({ msg: bookid })
    
    }

    const findauthor= async function (req, res) {
         let bookprice = await BookModel.findOneAndUpdate(

        { name: "Two states"}, //condition
        
        {price: 100 }, //update in data
        
        { new: true} )//, upsert: true
        
        let updateprice= bookprice.price ;
        
        let authorupdate =await authorModel.find({author_id: { $eq: bookprice.author_id}}).select({author_name:1,_id: 0 })
            res.send({msg: authorupdate, updateprice })
         }

         const findBooks = async function (req, res) {

            let allBooks = await BookModel.find({ price: {$gte: 50, $lte: 100}})
            
            let store =allBooks.map(x => x.author_id); 
            let NewBooks = await authorModel.find({author_id: store}).select({author_name : 1, id : 0})
            
            res.send(NewBooks)
            
            }
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.findauthor= findauthor
module.exports. findBooks=  findBooks
module.exports.creatAuthor=creatAuthor
    
  