





const  mongoose=require('mongoose')
const { Schema } = mongoose;
const CurrentlyScannedSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
             ref:'user'
       },
    barCode:{
        type:String,
    }
});

module.exports=mongoose.model('CurrentlyScanned',CurrentlyScannedSchema);
//to create the schema we need to first include the mongoose for mongodb after that from the mongoose
//we need to include the schema to create that one 
//now for creating schema just use the new keyword and then javascript object 
//after that using the mongoose need to export this schema using the model
