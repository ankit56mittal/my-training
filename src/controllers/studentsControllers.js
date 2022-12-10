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

    //let teacherId = req.params.teacherId;
    let studentId = req.params.studentId;
    let { name, data } = req.body;
   //console.log(data)
    let query = {  }

    // if (data.length === 0) {
    //   return res.status(400).send({ status: false, message: "fill students subject and marks data" });
    // }
    if (!isValidObjectId(req.teacherId)) {
      return res.status(400).send({ status: false, message: " Please!! input a valid Id :(" });
    }

    const studentExist = await studentModel.findOne({ _id: studentId })
    if (!studentExist) {
      return res.status(404).send({ status: false, message: " student does not exist" })
    }
    // console.log(studentId)
    // console.log(studentExist.teacherId)
    // console.log(teacherId)
    // console.log(studentExist)

    if(studentExist.teacherId!=req.teacherId) {
      return res.status(404).send({ status: false, message: "studentId and teacher id does not match" })
    }


    if (name) {
      if (!isValidName(name))
        return res.status(400).send({ status: false, message: "Please Enter Valid Name" });

      query.name = name
    }

    //if theacher is entering the marks of the subject that is already entered
  if(data.length!=0){
 let { subject, marks } = data[0];
    if (subject && marks) {
      console.log(data)


      //for checking if the subject aleady exist in the data
      const subjectExist = studentExist.data.findIndex(data => data.subject == subject);

      if (subjectExist != -1) {

       

        const increaseMarks = await studentModel.findOneAndUpdate({_id: studentId, "data.subject" :subject },
        { $inc: {"data.$[].marks":+marks}  }, { new: true });
        //{ $inc: { "grades.$[]": 10 } }
      }
      else {

         query.data = studentExist.data.concat(req.body.data)
         }

      }

 }
   
    let updatedStudent = await studentModel.findOneAndUpdate({ _id: studentId}, query, { new: true })

      return res.status(200).send({ status: true, message: "Student details updated successfully", data: updatedStudent })

  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }

}

//_______________________________________query students____________________________________________


const getStudent = async function (req, res) {
  try {

    
    const { name, subject,marksGreaterThan,marksLessThan} = req.query;
    let query = {}

    if(name){

      query.name = name
    }
    // {"someArray.$.someNestedArray":{"$elemMatch":{"name":"1"}}}
    // { 'instock.qty': { $lte: 20 } }
     
      
         if (subject) {
     
          query.subject = {'data.$.subject':subject}
        }
        
          //{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }

     
           
         
         if (query.marksGreaterThan && query.marksLessThan) {
          query.marks = {'data.$.marks':{ $gt: Number(marksGreaterThan), $lt: Number(marksLessThan) }}
        }
        else if (query.marksGreaterThan) {
          query.marks = {'data.$.marks':{ $gt: Number(marksGreaterThan) }}
        } else if (query.marksLessThan) {
          query.marks = {'data.$.marks':{ $lt: Number(marksLessThan) }}
        };
        console.log(query.subject)
     const getStudent = await studentModel.find(query)

     return res.status(200).send({ status: true, message: "Here the the requireddetais of students", data: getStudent })

     
       
        
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }

}

//____________________________________deleted_______________________________

const deleteStudent = async function (req, res) {
  try {


    let studentId = req.params.studentId;

    const studentExist = await studentModel.findOne({ _id: studentId },{isDeleted:false})
    if(!studentExist)
    return res.status(400).send({ status: false, message: "student deleted alresdy" })

    if(studentExist.teacherId!=req.teacherId) {
      return res.status(404).send({ status: false, message: "studentId and teacher id does not match" })
    }

    let deletedStudent = await findOneAndUpdate({_id:studentId,teacherId:req.teacherId},{isDeleted:true})

    return res.status(200).send({ status: true, message: "student deleted successfully", data: deletedStudent })

      



  }
    catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  
  }



module.exports = { filledMarks, updateStudent,getStudent,deleteStudent};
