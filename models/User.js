


           




const  mongoose=require('mongoose')
const { Schema } = mongoose;
const UserSchema=new Schema({
    Code :{
        type:String,
        required:true,
        unique:true
    },
    Region:{
        type:String
    },
    Department:{
        type:String
    },
    Location:{
        type:String
    },
    empNo:{
        type:String,
        
    },
    userName:{
        type:String,
       
    },
    mobNo:{
        type:Number,
        
       },
    Address:{
     type:String,
     required:true
    },
    Password:{
     type:String
    },
    NoOfMrns:{
     type:Number,
     default:0
    },
    NoOfIssues:{
     type:Number,
     default:0
    }

});
const User=mongoose.model('user',UserSchema);
//to create the keys for unique one which is email
//User.createIndexes()
module.exports=User