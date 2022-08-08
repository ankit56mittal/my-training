const express = require('express');
const lodash = require('lodash');
const abc = require('../introduction/intro')
 const xyz = require('../logger/logger')
 const pqr = require('../util/helper.js')
 const jkl = require('../validator/formatter.js')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
   xyz.logger()
   pqr.result1 ()
   pqr.info()
   jkl.strings()
    const months=["jan","feb","mar","april","may","june","july","aug","sept","oct","nov","dec"];
   console.log(lodash.chunk(months, [size=3]));
  // console.log(chunks);
  const odd=[1,3,5,7,9,11,13,15,17,19];
  console.log(lodash.tail(odd));

  const arr1=[1,2,2,3];
  const arr2=[4,5,5,6];
  const arr3=[7,8,8,9];
  const arr4=[10,12,12,13];
  const arr5=[14,15,15,16];
  console.log(lodash.union(arr1,arr2,arr3,arr4,arr5));
  const arrr =[["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
 
  console.log(lodash.fromPairs(arrr));

    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})
router.get('/give-me-students-data',function(req, res){

 })
module.exports = router;
// adding this comment for no reason