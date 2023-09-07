

         



const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser')

const Inventory=require('../models/Inventory')

const { body, validationResult } = require('express-validator');
 //this will give the all the notes of a loggedin user


//user

//question
//titles
//description
//type
//date
//images
//likes
//disLikes
//reports
//nameOfTheAuthor
//postChilds
//views


//with user
router.get('/fetchallinventory',fetchUser,async (req,res)=>{
    try{
       
        //console.log(req)
        const inverntories=await Inventory.find({user:req.user.id})
        res.json(inverntories)
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

router.delete('/deleteallinventory',async (req,res)=>{
    try{
       
        //console.log(req)
        const inverntories=await Inventory.find().deleteMany()
        res.json(inverntories)
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})








router.post('/addinventory',fetchUser,[
    
   /* [body('title','Enter a valid title').isLength({ min: 3 })],
    [body('description','Enter a valid description').isLength({ min: 5 })],
    body('type','Enter a valid type').isLength({ min: 3 }),*/


    
],async (req,res)=>{
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        console.log("backenmd")
       console.log(req.body)
      const inventory=new Inventory({
        barCode:req.body.barCode,
        user:req.user.id,
        Entry:req.body.Entry,
        storeAddress:req.body.storeAddress,
        supplierNameAndAddress:req.body.supplierNameAndAddress,
        issuedBy:req.body.issuedBy,
        poNumber:req.body.PONumber,
        poDate:req.body.PODate,
        date:req.body.date,
        No:req.body.No
      })
      //console.log("set")
      //console.log(inventory)
      const savedPost=await inventory.save();
      //console.log(savedPost)
      res.json(savedPost)


    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }
    })

   


router.put('/updateinventory/:id',fetchUser,[
    
   
        
    ],async (req,res)=>{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try{
       


     

       let inventory=await Inventory.findById(req.params.id)
       if(!inventory){return res.status(404).send("Not Found")}
       if(inventory.user.toString()!==req.user.id){return res.status(404).send("Not Allowed")}
      const newInventory={}
      if(req.body.storeAddress){newInventory.storeAddress=req.body.storeAddress}
      if(req.body.supplierNameAndAddress){newInventory.supplierNameAndAddress=req.body.supplierNameAndAddress}
      if(req.body.issuedBy){newInventory.issuedBy=req.body.issuedBy}
      if(req.body.Entry){newInventory.Entry=req.body.Entry}
  
       if(newInventory.storeAddress===null)newInventory.storeAddress=inventory.storeAddress
       if(newInventory.supplierNameAndAddress===null)newInventory.supplierNameAndAddress=inventory.supplierNameAndAddress
       if(newInventory.issuedBy===null)newInventory.issuedBy=inventory.issuedBy
       if(newInventory.Entry===null)newInventory.Entry=inventory.Entry
       if(newInventory.barCode===null)newInventory.barCode=inventory.barCode
       if(newInventory.user===null)newInventory.user=inventory.user
       if(newInventory.No===null)newInventory.No=inventory.No
         
       
       
     
       inventory=await Inventory.findByIdAndUpdate(req.params.id,newInventory)
       res.json({inventory})
        }
        catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }
        })   
        
        
/*

 router.delete('/deletepost/:id',fetchUser,async (req,res)=>{
           try{
           let post=await Posts.findById(req.params.id)
           if(!post){return res.status(404).send("Not Found")}
           if(post.user.toString()!==req.user.id){return res.status(404).send("Not Allowed")}

           post=await Posts.findByIdAndDelete(req.params.id)
           //need to delete all the attachement
           //reports table must be deleted first 
           res.json({"Success":"Note has been deleted",post:post})
 }catch(error)
 {
     //console.error(error.message)
     res.status(500).send("Some error occured")
 }
            })
            
            

router.delete('/deleteallposts',fetchUser,async (req,res)=>{
    try{
        //need to delete all the attachement fpr each
        const posts=await Posts.find({user:req.user.id})
                for(let index=0;index<posts.length;index++)
                {
                    await Post.findByIdAndDelete(posts[index]._id);
                }
               
                res.json({"Success":"posts are deleted",posts:posts})
   
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }
                
                 })*/     
                 
                 

module.exports=router