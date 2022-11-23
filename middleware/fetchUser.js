






var jwt = require('jsonwebtoken');
const JWT_KEY=process.env.jwt_key

const fetchUser=async(req,res,next)=>{
    
    console.log("i am fetching")
  
    const token=req.header('auth-token')

    if(!token)
    {
        res.status(401).send({error:"Authtoken fail 1"})
    }
    try{
        
        const data= await jwt.verify(token,JWT_KEY);//to verify the authtoken wiht key
        req.user=data.user;
        next();  //to call the another subsequent functions
    }catch(error)
    {
        res.status(401).send({error:"Authtoken fail 2"})
    }
  
}
module.exports=fetchUser;

//in this middleware we are using the jwt auth that's why included that 
//why we are using this middleware is to get the user from the authtoken which is comming from the request
//another one is jwt_key 
//now in the function we are accepting the req,res,next parameters
