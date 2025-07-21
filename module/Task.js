const mongoose=require('mongoose')

const task = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    dueDate:{
        type:String,
        required:true
    }
})

const Task = mongoose.model('Task',task);
module.exports=Task;