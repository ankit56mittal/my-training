const studentModel = require("../models/studentModel");
const teacherModel = require("../models/teacherModel");
const { isValidRequestBody, isValidName, isValidMarks } = require("../validator/validations");
const { isValidObjectId } = require("mongoose");


const filledMarks = async (req, res) => {
  // res.setHeader('Access-Conrol-Allow-Origin', '*');
  try {
    let teacherId = req.params.teacherId;
    let { name, data } = req.body;
    let {subject, marks} = data;

    if (data.length === 0) {
      return res.status(400).send({ status: false, message: "fill students subject and marks data" });
    }
    if (!isValidObjectId(teacherId)) {
        return res.status(400).send({ status: false, message: " Please!! input a valid Id :(" });
      }
  
    if (!name)
      return res.status(400).send({ status: false, message: "Please Enter student Name" });

    if (!isValidName(name))
      return res.status(400).send({ status: false, message: "Please Enter Valid Name" });

    // if (!subject)
    //   return res.status(400).send({ status: false, message: "Please Enter subject" });

    // if (!isValidName(subject))
    //   return res.status(400).send({ status: false, message: "Please Enter Valid subject Name" });

    // if (!marks)
    //   return res.status(400).send({ status: false, message: "Please Enter  marks" });

    // if (!isValidMarks(marks))
    //   return res.status(400).send({ status: false, message: "Please Enter Valid marks" });

      let Obj = {
        teacherId:teacherId,
        name: name,
        data:data,
      }

      let studentMarks = await studentModel.create(Obj)
      return res.status(201).send({ status:true, message: studentMarks});

    } catch (err) {
       return  res.status(500).send({ status: false, message: err.message });
      }
    };

//=======================================================>>>

const updateStudent = async function(req, res){
  
}




    module.exports = {filledMarks};
