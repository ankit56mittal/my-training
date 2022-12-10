const express = require('express');
const router = express.Router();
const userController = require("../controllers/userControllers");
const studentsController = require("../controllers/studentsControllers");

router.post('/createUser', userController.createUser);
router.post('/userLogin', userController.userLogin);
router.post('/filledMarks/:teacherId', studentsController.filledMarks);

router.post("/updatestudent/:teacherId/:studentId", studentsController.updateStudent)

//API for wrong route-of-API
router.all("/*", function (req, res) {
    res.status(400).send({
      status: false,
      message: "Path Not Found",
    });
  });


module.exports = router;