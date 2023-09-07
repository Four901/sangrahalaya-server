





const  mongoose=require('mongoose')
const { Schema } = mongoose;
const InventorySchema=new Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
         ref:'user'
   },
    barCode:{
        type:String,
        require:true
    },
    Entry:[
     {
        AsPerPo:{
            type:Number
        },
        RecdUptoDate:{
            type:Number
        },
        Description:{
            type:String
        },
        Code:{
            type:String
        },
        QtyReceived:{
            type:Number
        },
        QtyAccepted:{
            type:Number
        },
        Rs:{
            type:Number
        },
        P:{
            type:Number
        }
     }
    ],
    No:{
        type:String
    },
   issuedBy:{
     type:String,
     require
   },
    date:{
        type:String
        
    },
    secondDate:{
        type:Date,
        default:Date.now
    }
    ,
    supplierNameAndAddress:{
        type:String,
        require:true
    },
   poNumber:{
    type:Number
   },
   poDate:{
    type:Date
   },
    storeAddress:{
        type:String
    }


});

module.exports=mongoose.model('barcodeinventory',InventorySchema);
//to create the schema we need to first include the mongoose for mongodb after that from the mongoose
//we need to include the schema to create that one 
//now for creating schema just use the new keyword and then javascript object 
//after that using the mongoose need to export this schema using the model
