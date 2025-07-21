const express = require('express')
const app = express()
const db=require('./db');
const port = 3000
const bodyParser= require('body-parser')

app.use(bodyParser.json());

const Person = require('./module/Person')
const MenuItems = require('./module/MenuItems')
const Task = require('./module/Task')

app.get('/',(req,res)=>{
  res.send("welcome to my blog")
})
app.get('/nitin', (req, res) => {
    const nitin={
        "name":"nitin",
        "sername":"lagshetti"
     

    }
  res.send(nitin)
})

app.post('/person', async (req,res)=>{
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

app.get('/person',async (req,res)=>{
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

app.post('/menuItems',async (req,res)=>{
  try{
    
    const Data = req.body;
    const newMenuItems = new MenuItems(Data);
    const savedMenuIems = await newMenuItems.save()
    console.log('data saved')
    res.status(200).json(savedMenuIems);

  }
  catch(err){

    console.log(err);
    res.status(500).json({error:'internal sever error'})

  }
})

app.post('/task',async (req,res)=>{
  try{

    const Data = req.body;
    const newTask = new Task(Data)
    const savedTask = await newTask.save()
    console.log('Data is feched ')
    res.status(200).json(savedTask)

  }
  catch(err){
    console.log(error);
    res.status(500).json({error:"internal server error"})

  }
})

app.get('/person/:workType', async (req,res)=>{
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

//import router of the person

const personRouter= require('./Routes/PersonRoutes')
app.use('/person',personRouter);

const MenuItemsRouter = require('./Routes/MenuItemsRouter')
app.use('/menuItems', MenuItemsRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



