

            




const  mongoose=require('mongoose')
const { Schema } = mongoose;
const ItemsSchema=new Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
   },
    barCode:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        require:true
    }
    ,
    inInventory:{
        type:Number,
        default:0
    },
    Code:{
        type:String
    },
    reports:[{
        curdate:{
            type:String
        },
        number:{
            type:Number,
            default:0
        },
        type:{
            type:String
        },
        secondDate:{
            type:Date,
            default:Date.now
        },
        remains:{
            type:Number,
            default:0
        },
        remark:{
            type:String,
            
        }

       }],
       
   
});

module.exports=mongoose.model('itemsinventory',ItemsSchema);
//to create the schema we need to first include the mongoose for mongodb after that from the mongoose
//we need to include the schema to create that one 
//now for creating schema just use the new keyword and then javascript object 
//after that using the mongoose need to export this schema using the model
