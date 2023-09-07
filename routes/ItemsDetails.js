

            
const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser')

const Items=require('../models/Items')

const { body, validationResult } = require('express-validator');
 //this will give the all the notes of a loggedin user



router.get('/fetchallitemsdescriptions',fetchUser,async (req,res)=>{
    try{

        //console.log(req)
        const items=await Items.find({user:req.user.id});
        //console.log(items)

        let descriptions=[];
        
       
        items.map((item)=>{
            
            descriptions.push(item.description)
        })

       
        descriptions=descriptions.sort()
        res.json(descriptions)
       
        
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

router.get('/fetchallitems',fetchUser,async (req,res)=>{
    try{

       
        const items=await Items.find({user:req.user.id});
    
        res.json(items)
       
        
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})


router.put('/fetchwithbarcode',fetchUser,async (req,res)=>{
    try{

        //console.log(req)
        const item=await Items.find({barCode:req.body.barCode,user:req.user.id})
        res.json(item)
       
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})
router.put('/fetchdescriptionwithbarcode',fetchUser,async (req,res)=>{
    try{
        //console.log("fgteg dfgt")
        //console.log(req.body)
        const item=await Items.find({barCode:req.body.barCode,user:req.user.id})
       
        res.json(item[0].description)
       
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})
router.get('/fetchitemwithdescription',fetchUser,async (req,res)=>{
    try{

        //console.log(req)
        const item=await Items.find({description:req.body.description,user:req.user.id})
        res.json(item)
       
        
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})
router.put('/fetchbarcodewithdescription',fetchUser,async (req,res)=>{
    try{
        //console.log("at geting barcode")
        //console.log(req.body)
        const item=await Items.find({description:req.body.description,user:req.user.id})
        //console.log(item[0].barCode)
    
        res.json(item[0].barCode)
       
        
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})


router.put('/fetchreportswithdescription',fetchUser,async (req,res)=>{
    try{
        //console.log("getting with dates")
        //console.log(req.body)
        var item=await Items.find({description:req.body.Description,user:req.user.id})
        //console.log(item)
        var reports=item[0].reports;
        //console.log(reports)
    
        res.json(reports)
       
        
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})








router.post('/additems',fetchUser,[
    
   
    
],async (req,res)=>{
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
     
      const item=new Items({
        user:req.user.id,
        barCode:req.body.barCode,
        description:req.body.Description,
      })
      
      const savedPost=await item.save();
      //console.log(savedPost)
      res.json(savedPost)


    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }
    })


    

router.put('/updateitem',fetchUser,[
    
   
        
    ],async (req,res)=>{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try{
           console.log("req at update")
           console.log(req.body)
           if(req.body.isAdmin=='false')
           {
            return res.status(404).send("Not Allowed")
           }
        let item=await Items.findOne({description:req.body.Description})
       
      // var filterData = data.filter(item => item.description.includes(search));
     
       if(!item){return res.status(404).send("Not Found")}
       if(item.user.toString()!==req.user.id){return res.status(404).send("Not Allowed")}
       let arr=item.reports;
     
       const newItem={}
       const newrep={curdate:req.body.reports.curdate,number:req.body.reports.number,type:req.body.reports.type,remains:req.body.reports.number+item.inInventory,supplierName:req.body.reports.supplierName,
    issuedTo:req.body.reports.remark,userid:req.body.reports.userId};
      newItem.inInventory=newrep.remains
     
       if(req.body.reports){
       
        arr.push(newrep)
        newItem.reports=arr
       
        }
       if(req.body.code)
       {
        newItem.Code=req.body.code;
       }
      if(newItem.description===null)newItem.description=item.description
       if(newItem.barCode===null)newItem.barCode=item.barCode
       if(newItem.reports===null)newItem.reports=item.reports
       if(newItem.user===null)newItem.user=item.user

       //console.log("ohk")
       //console.log(newItem)
       item=await Items.findOne({description:req.body.Description}).updateOne(newItem)
       res.json({item})
        }
        catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }
        })      


    

module.exports=router