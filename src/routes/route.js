const { application } = require('express');
const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publishercontroller = require("../controllers/publishercontroller");
const bookModel = require('../models/bookModel');

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/createAuthor", authorController.createAuthor  )
router.post("/createnewAuthor", authorController.createnewAuthor  )

 router.get("/getAuthorsData", authorController.getAuthorsData)
 
//  const getBooksWithAuthorDetailspublisherdetails= async function (req, res) {
//     let specificBook = await bookModel.find().populate('author').populate('publisher')
//    res.send({msg: specificBook})
// }

 router.put("/newBook",bookController.putreq)

 router.put("/newPut",bookController.updatebookprice)

 router.post("/createnewBook", bookController.createnewBook  )
router.post("/createPublisher",publishercontroller.createPublisher)
//  router.get("/getBooksData", bookController.getBooksData)
 router.get ("/getBooksWithAuthorDetailspublisherdetails",bookController.getBooksWithAuthorDetailspublisherdetails)
//  router.put("/books",bookController.)
module.exports = router