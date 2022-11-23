



const mongoose =require('mongoose')
require("dotenv").config()
const mongooseURI=process.env.DB_URI


//adding inotebook in url to create a new db with the name of inotebook


const connectToMongoose=()=>{
    mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
   
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
}

module.exports=connectToMongoose