








const express=require('express');

const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_KEY=process.env.jwt_key
const fetchUser=require('../middleware/fetchUser')




router.post('/createuser',[
  body('Code','Enter a valid name').isLength({ min: 3 }),
  body('Region','Enter a valid mail').isLength({min:5}),
  body('Department','Enter a valid name').isLength({ min: 3 }),
  body('Location','Enter a valid Location').isLength({ min: 3 }),
  body('Address','Enter a valid mail').isLength({min:5}),
  body('Password','Password should be atleast of 5 chars').isLength({ min: 5 }),

],async (req,res)=>{
let Success=false
/*//console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
//console.log("here i am ");
const errors = validationResult(req);
//console.log("here i am "+req.body.Code);
  if (!errors.isEmpty()) {
    return res.status(400).json({Success, errors: errors.array() });
  }
  //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
  try{
    //console.log("here i am "+req.body.Code);
   
    let user=await User.findOne({Code:req.body.Code});
  
    if(user)
    {
       return res.status(400).json({Success,error:"User with the Code already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.Password,salt);
    //console.log(req.body)
    user= await User.create({
      Code: req.body.Code,
      empNo:req.body.Code,
      userName:req.body.Code,
      Location:req.body.Location,
      mobNo:Math.floor(1000000000 + Math.random() * 1000000000),
      Region:req.body.Region,
      Department:req.body.Department,
      Address:req.body.Address,
      Password: secPass,
    })
    //console.log(req.body)
    //console.log(user)
   
    let Success=true
    res.json({Success,user})
  /*  var AuthToken=jwt.sign(data,JWT_KEY);
    //console.log(AuthToken)
    res.json(AuthToken)
    var decoded = jwt.verify(AuthToken, JWT_KEY);
//console.log(decoded)*/
    //.then(user => res.json(user))
    //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
  }catch(error){
    //console.error(error.message)
    res.status(500).send({Success,error:"Some error occured 235"})
  }

    
})




router.post('/loginuser',[
  body('Code',"Please Enter the Code").isLength({ min: 3 }),
  // password must be at least 5 chars long
  body('Password',"Password can not be blank").exists(),
],async (req,res)=>{
  let Success=false
/*//console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({Success, errors: errors.array() });
  }
  //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
  const {Code,Password}=req.body;
  try{
      //console.log(req.body)
    let user=await User.findOne({Code:req.body.Code});
    if(!user)
    {
       return res.status(400).json({Success,error:"Enter The Correct Credentials with code"});
    }
    
    var passwordCompare=await bcrypt.compare(Password,user.Password);
    
    //console.log(Password)
    //console.log(user.Password)
    //console.log(passwordCompare)
    if(!passwordCompare)
    {
      return res.status(400).json({Success,error:"Enter The Correct Credentials with pass"});
    }

    var data={
      user:{
        id:user.id
      }
    }
    var AuthToken=jwt.sign(data,JWT_KEY);//over here we are signing the jwtauth token which is containing the id of the user
    //console.log(AuthToken)
    Success=true
    res.json({Success,AuthToken})
    /*var decoded = jwt.verify(AuthToken, JWT_KEY);
//console.log(decoded)*/
    //.then(user => res.json(user))
    //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
  }catch(error){
    //console.error(error.message)
    res.status(500).send({Success,error:"Internal Server Error"})
  }

    
})



router.get('/getuser',fetchUser,async (req,res)=>{
/*//console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
let Success=false
try{
const userId=req.user.id;
const user=await User.findById(userId).select(-"password")
Success=true
res.send({Success,user})
}catch(error)
{
  //console.error(error.message)
    res.status(500).send({Success,error:"Authtoken fail 3"})
}

    
})

router.get('/getbasicuser',fetchUser,async (req,res)=>{
  /*//console.log(req.body)
  const user=User(req.body)
  user.save();
  res.send(req.body)*/
  let Success=false
  try{
    //console.log("getting")
  const userId=req.user.id;
  const user=await User.findById(userId)

  Success=true
  var opt={Address:user.Address,Location:user.Location,Region:user.Region,Department:user.Department,NoOfMrns:user.NoOfMrns,NoOfIssues:user.NoOfIssues}
  res.send({Success,opt})
  }catch(error)
  {
    //console.error(error.message)
      res.status(500).send({Success,error:"Authtoken fail 3"})
  }
  
      
  })




router.delete('/deleteuser',fetchUser,async (req,res)=>{
   
    let Success=false
    try{
    const userId=req.user.id;
    const user=await User.findById(userId).select(-"password")
    const resi=await User.findByIdAndDelete(userId)
    Success=true
    res.send({Success,resi})
    }catch(error)
    {
      //console.error(error.message)
        res.status(500).send({Success,error:"You Need to signup"})
    }
    
        
    })



router.post('/updateuser',[
  body('Code','Enter a valid name').isLength({ min: 3 }),
  body('Address','Enter a valid mail').isLength({min:5}),
  body('Type','Enter the type').isLength({ min: 3 })
 
],async (req,res)=>{
  let Success=false
/*//console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
//console.log("here i am ");
const errors = validationResult(req);
//console.log("here i am "+req.body.Code);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
      //console.log("here i am "+req.body.Code);
      let user1=await User.findOne({Code:req.body.Code});
      //console.log(req.body.Type)
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
     

     
     
     
   
      const user= await User.findOne({Code:req.body.Code}).updateOne({
      Code: req.body.Code,
      Region:req.body.Region,
      Department:req.body.Department,
      Location:req.body.Location,
      Address:req.body.Address
      })
      //console.log(req.body)
      //console.log(user)
      
      let Success=true
      res.json({Success,user})
    /*  var AuthToken=jwt.sign(data,JWT_KEY);
      //console.log(AuthToken)
      res.json(AuthToken)
      var decoded = jwt.verify(AuthToken, JWT_KEY);
//console.log(decoded)*/
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      //console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})



router.post('/updatepassword',fetchUser,async (req,res)=>{
  let Success=false
/*//console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
//console.log("here i am ");
const errors = validationResult(req);
//console.log("here i am "+req.user.id);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
      
      let user1=await User.findOne({user:req.user.id});
      
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
    
      //console.log(req.body)

    
      const salt=await bcrypt.genSalt(10);
      const secPass= await bcrypt.hash(req.body.Password,salt);
      const user= await User.findOne({user:req.user.id}).updateOne({
  
        password:secPass
  
      })
      //console.log(req.body)
      //console.log(user)
   
      let Success=true
      res.json({Success,user})
    /*  var AuthToken=jwt.sign(data,JWT_KEY);
      //console.log(AuthToken)
      res.json(AuthToken)
      var decoded = jwt.verify(AuthToken, JWT_KEY);
//console.log(decoded)*/
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      //console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})


router.post('/addmrns',fetchUser,async (req,res)=>{
  let Success=false
/*//console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
//console.log("here i am ");
const errors = validationResult(req);
//console.log("here i am "+req.user.id);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
      
      let user1=await User.findOne({_id:req.user.id});
      
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
    
      //console.log(req.body)

      //const user1=await User.findOne({user:req.user.id});
     
      const user= await User.findOne({_id:req.user.id}).updateOne({

        NoOfMrns:user1.NoOfMrns+1
  
      })
      //console.log(req.body)
      //console.log(user)
   
      let Success=true
      res.json({Success,user})
    /*  var AuthToken=jwt.sign(data,JWT_KEY);
      //console.log(AuthToken)
      res.json(AuthToken)
      var decoded = jwt.verify(AuthToken, JWT_KEY);
//console.log(decoded)*/
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      //console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})



router.post('/addissues',fetchUser,async (req,res)=>{
  let Success=false
/*//console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
//console.log("here i am ");
const errors = validationResult(req);
//console.log("here i am "+req.user.id);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
      
      let user1=await User.findOne({_id:req.user.id});
      
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
    
      //console.log(req.body)

     
     
      const user= await User.findOne({_id:req.user.id}).updateOne({

        NoOfIssues:user1.NoOfIssues+1
  
      })
      //console.log(req.body)
      //console.log(user)
   
      let Success=true
      res.json({Success,user})
    /*  var AuthToken=jwt.sign(data,JWT_KEY);
      //console.log(AuthToken)
      res.json(AuthToken)
      var decoded = jwt.verify(AuthToken, JWT_KEY);
//console.log(decoded)*/
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      //console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})



/*
router.post('/makelocaladmin',[
  
],async (req,res)=>{
  let Success=false

//console.log("here i am ");
const errors = validationResult(req);
//console.log("here i am "+req.body._id);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
      
      let user1=await User.findOne({_id:req.body._id});
      
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
    
      //console.log(req.body)

    
  
      const user= await User.findOne({_id:req.body._id}).updateOne({
  
        isLocalAdmin:"true"
  
      })
      //console.log(req.body)
      //console.log(user)
      var data={
        "id":req.body._id
      }
      let Success=true
      res.json({Success,user})
  
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      //console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})



router.post('/removelocaladmin',[
  
],async (req,res)=>{
  let Success=false

//console.log("here i am ");
const errors = validationResult(req);
//console.log("here i am "+req.body._id);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
      
      let user1=await User.findOne({_id:req.body._id});
      
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
    
      //console.log(req.body)

    
  
      const user= await User.findOne({_id:req.body._id}).updateOne({
  
        isLocalAdmin:"false"
  
      })
      //console.log(req.body)
      //console.log(user)
      var data={
        "id":req.body._id
      }
      let Success=true
      res.json({Success,user})
  
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      //console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})



router.post('/makemainadmin',[
  
],async (req,res)=>{
  let Success=false

//console.log("here i am ");
const errors = validationResult(req);
//console.log("here i am "+req.body._id);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
      
      let user1=await User.findOne({_id:req.body._id});
      
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
    
      //console.log(req.body)

    
  
      const user= await User.findOne({_id:req.body._id}).updateOne({
  
        isMainAdmin:"true"
  
      })
      //console.log(req.body)
      //console.log(user)
      var data={
        "id":req.body._id
      }
      let Success=true
      res.json({Success,user})
    
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      //console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})



router.post('/removemainadmin',[
  
],async (req,res)=>{
  let Success=false

//console.log("here i am ");
const errors = validationResult(req);
//console.log("here i am "+req.body._id);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
      
      let user1=await User.findOne({_id:req.body._id});
      
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
    
      //console.log(req.body)

    
  
      const user= await User.findOne({_id:req.body._id}).updateOne({
  
        isMainAdmin:"false"
  
      })
      //console.log(req.body)
      //console.log(user)
      var data={
        "id":req.body._id
      }
      let Success=true
      res.json({Success,user})
    
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      //console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})*/













module.exports=router

//the hashing is the algorithm to store the paqssword in the form of hash means rather than storing the plan text password 
//backend will put the hashed code into the table 
//salt is used to make the hashed code more compliacted to that common passwords can't be broken 
//also pepper is used to make more security by adding after salt
//for these things we are going to use bcycripts.js