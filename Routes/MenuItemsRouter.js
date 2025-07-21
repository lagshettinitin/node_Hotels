const express = require('express');
const router = express.Router();
const MenuItems = require('./../module/MenuItems');

router.post('/',async (req,res)=>{
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

router.get('/', async (req,res)=>{
    try{

        const menuItems= await MenuItems.find();
        console.log('Data is fetched ')
        res.status(200).json(menuItems);

    }
    catch(err){

        console.log(error)
        res.status(500).json({error:"internal server is error"})

    }
})

router.get('/:tasteType', async (req,res)=>{
    try{

        const taste = req.params.tasteType
        if( taste=='Sweet'){
            const Data = await MenuItems.find({taste:taste})
            console.log('Data feched')
            res.status(200).json(Data);
        }
         else{
         res.status(404).json({error:'invalid taste type'})
   
  }
   }
  catch(err){

     console.log('err')
     res.status(404).json({error:'internal server error'})
  }
})


router.put('/:id', async (req,res)=>{
  try{

    const menueId = req.params.id;
    const updateMenuData = req.body;
     
    const updatedMenue = await MenuItems.findByIdAndUpdate( menueId, updateMenuData,{
      new:true,
      runValidators: true,
    });
    
    if (!updatedMenue) {
      return res.status(404).json({ error: 'Menue not found' });
     }
      res.json(updatedMenue);}
  catch(err){

        console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal server error' });

  }

})

module.exports= router;