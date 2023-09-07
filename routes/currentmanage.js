

const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser')
const Inventory=require('../models/Inventory')
const CurrentlyScanned =require('../models/CurrentlyScanned')

const { body, validationResult } = require('express-validator');

router.post('/removecurrent',fetchUser,async (req,res)=>{
    try{
       
       
        const barcode=req.body.decodedText;
        //console.log("baar "+barcode)
       

        

        const inverntories=await CurrentlyScanned.find({user:req.user.id});
        
        if(!inverntories.length)
        {
             //console.log("ssssss")
             const inventory=new CurrentlyScanned({
             
                barCode:req.body.decodedText,
                user:req.user.id
              })
              
              const savedPost=await inventory.save();
              res.json({savedPost})
        }
        else
        {
            

          
            
            const newInventory={}
            if(barcode){newInventory.barCode=barcode}
           newInventory.user=req.user.id
                let currentinventory=await CurrentlyScanned.find({user:req.user.id});
                //console.log("current ")
                //console.log(currentinventory[0].barCode)
              let  inventory=await currentinventory[0].update(newInventory)
                res.json({inventory})
            

        }
        
        
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

router.post('/putcurrentshow',fetchUser,async (req,res)=>{
    try{
       
       
        const barcode=req.body.decodedText;
        //console.log("baar "+barcode)
        let inventory1=await Inventory.find({user:req.user.id,barCode:barcode})
        //console.log("inventory "+inventory1)

        if(!inventory1.length){
            //console.log("Not Found")
            return res.status(404).send("Not Found")}

        const inverntories=await CurrentlyScanned.find({user:req.user.id});
        
        if(!inverntories.length)
        {
             //console.log("ssssss")
             const inventory=new CurrentlyScanned({
               user:req.user.id,
                barCode:req.body.decodedText
                
              })
              
              const savedPost=await inventory.save();
              res.json({savedPost})
        }
        else
        {
            

          
            
            const newInventory={}
            if(barcode){newInventory.barCode=barcode}
            newInventory.user=req.user.id
     
            
            let inventory=await Inventory.find({user:req.user.id,barCode:barcode})
            //console.log("inventory "+inventory)
            if(!inventory){return res.status(404).send("Not Found")}
            else{
                let currentinventory=await CurrentlyScanned.find({user:req.user.id});
                //console.log("current ")
                //console.log(currentinventory[0].barCode)
                inventory=await currentinventory[0].update(newInventory)
                res.json({inventory})
            }
             
           



        }
        
        
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

router.get('/getcurrentshow',fetchUser,async (req,res)=>{
    try{
        
       
        const inverntories=await CurrentlyScanned.find();
        console.log(inverntories)
        if(!inverntories.length)
        {
            return res.status(404).send("No record found")
        }
        else
        {
      
            let currentinventory=await CurrentlyScanned.find({user:req.user.id});
            //console.log("current ")
            //console.log(currentinventory[0].barCode)
     
            console.log(req.user)
            let inventory=await Inventory.find({user:req.user.id,barCode:currentinventory[0].barCode})
         
            console.log(req.user)
            console.log(currentinventory[0].barCode)
        
            res.json({inventory})
            console.log(inventory)


        }
       
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

module.exports=router