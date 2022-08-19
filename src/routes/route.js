
const express=require('express')
const router=express.Router();
// const UserModel- require("../models/userModel.js")

//const UserController= require("../controllers/userController")
 const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) { res.send("My first ever api!")

})

//creating author

router.post("/createAuthor", BookController.creatAuthor)

//creating book

router.post("/createBook", BookController.createBook)

//1 getting books data

router.get("/getBooksData", BookController.getBooksData)

//2nd

router.get("/findauthor", BookController.findauthor)

//3rd

router.get("/findBooks", BookController.findBooks)

module.exports = router;