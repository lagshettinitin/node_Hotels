const mongoose=require('mongoose')

// define the mongoDB connection URL

const mongoURL='mongodb://localhost:27017/nitin'

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


// get the default connection
// mongoose maintaining the default connection object representing the mongoDB connection

const db=mongoose.connection;

// event listners for databases connection

db.on('connected',()=>{
    console.log('mongoDB server is connected')
})

db.on('disconnected',()=>{
    console.log('mongoDB  disconnected')
})

db.on('error',()=>{
    console.log('mongoDB conncection error')
})

// Export the data bese connection
module.exports=db;
