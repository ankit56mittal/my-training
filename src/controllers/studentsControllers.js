const studentModel = require("../models/studentModel");
const teacherModel = require("../models/teacherModel");
const { isValidRequestBody, isValidName, isValidMarks } = require("../validator/validations");
const { isValidObjectId } = require("mongoose");


const filledMarks = async (req, res) => {
  // res.setHeader('Access-Conrol-Allow-Origin', '*');
  try {
    let teacherId = req.params.teacherId;
    let { name, data } = req.body;
    let { subject, marks } = data;

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
      teacherId: teacherId,
      name: name,
      data: data,
    }

    let studentMarks = await studentModel.create(Obj)
    return res.status(201).send({ status: true, message: studentMarks });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//=======================================================>>>

const updateStudent = async function (req, res) {
  try {
    //teacherId, name, data(marks, subject)

    let teacherId = req.params.teacherId;
    let studentId = req.params.studentId;
    let { name, data } = req.body;
   
    let filter = {  }

    // if (data.length === 0) {
    //   return res.status(400).send({ status: false, message: "fill students subject and marks data" });
    // }
    if (!isValidObjectId(teacherId)) {
      return res.status(400).send({ status: false, message: " Please!! input a valid Id :(" });
    }

    const studentExist = await studentModel.findOne({ _id: studentId })
    if (!studentExist) {
      return res.status(404).send({ status: false, message: " student does not exist" })
    }
    console.log(studentId)
    console.log(studentExist.teacherId)
    console.log(teacherId)
    console.log(studentExist)

    if(studentExist.teacherId!=teacherId) {
      return res.status(404).send({ status: false, message: "studentId and teacher id does not match" })
    }


    if (name) {
      if (!isValidName(name))
        return res.status(400).send({ status: false, message: "Please Enter Valid Name" });

      filter.name = name
    }

    //if theacher is entering the marks of the subject that is already entered
  if(data){
 let { subject, marks } = data[0];
    if (subject && marks) {



      //for checking if the subject aleady exist in the data
      const subjectExist = studentExist.data.findIndex(data => data.subject == subject);

      if (subjectExist !== -1) {

        //filter.data = { "data.subject": subject, $inc: { marks: +marks } }

        const increaseMarks = await studentModel.findOneAndUpdate({_id: studentId, "data.subject": subject },
        { $inc: { "data.$.marks": +marks } }, { new: true });

      }
      else {

        // filter.data = { $push: { subject: subject, marks: marks } }

        const updateMarks = await studentModel.findOneAndUpdate({ teacherId: teacherId },
        { $push: {"data":[{  subject:subject, marks: marks }] }}, { new: true });

      }

      
    }



  }
   
    let updatedStudent = await studentModel.findOneAndUpdate({ _id: studentId }, filter, { new: true })

      return res.status(200).send({ status: true, message: "Student details updated successfully", data: updatedStudent })

  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }

}







module.exports = { filledMarks, updateStudent };
