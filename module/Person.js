const mongoose=require('mongoose')

const PersonSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    
    Age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },

    mobile:{
        type:Number,
        required:true,

    },
    address:{
        type:String,

    },
    salary:{
        type:Number,
        required:true
    }
})

// Create a person model

const Person = mongoose.model('Person',PersonSchema);
module.exports=Person;