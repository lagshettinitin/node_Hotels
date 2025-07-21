const express = require('express')
const router = express.Router();
const Person = require('./../module/Person')

router.post('/', async (req,res)=>{
          try{
            const Data =  req.body;    // asumming the request body contain person data 
          // Create new person doc using mogoose model
          const newPerson = new Person(Data);  // abe Person.js file etha use vaylay 
          const response = await newPerson.save()
          console.log('Data saved');
          res.status(200).json(response);
          
          }
          catch(error){

            console.log(error);
            res.status(500).json({error:'internal server error'});


          }
})
router.get('/',async (req,res)=>{
 try{
   const Data = await Person.find();
   console.log('Data feched ');
   res.status(200).json(Data);


 }
 catch(err){

   console.log(err);
   res.status(500).json({error:"internal server error"})
 }

})

router.get('/:workType', async (req,res)=>{
  try{
    const workType = req.params.workType; //extract the work type from the url 
  if( workType== 'chef'|| workType=='manager'|| workType=='waiter'){
    const Data = await Person.find({work:workType});
    console.log('Data feched')
    res.status(200).json(Data);
  }
  else{
     res.status(404).json({error:'invalid work type'})
   
  }

  }
  catch(err){

     console.log('error')
     res.status(404).json({error:'internal server error'})
  }
})

module.exports= router;
