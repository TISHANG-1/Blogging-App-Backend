const User =  require('../models/userModel.js');  
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors  = require('../middleware/catchAsyncErrors')  
const sendToken =  require("../utils/jwtToken.js") ; 
 

exports.registerUser = catchAsyncErrors(
    async(req , res , next)=>{    
        console.log("this is the register portal")  ; 
        const {
            name, email, password
        }  = req.body ; 
        const user =  await User.create({name, email , password})   
        sendToken(user, 201 , res) ; 
    }
)  

exports.loginUser = catchAsyncErrors(  
   
   async(req , res , next)=>{   
    console.log("tishang login") ;
      const {email , password} = req.body ;  
      // checking if user has given password and email both  
      if(!email || !password){
     return next(new ErrorHandler("Please Enter  Email and Password" , 400)) ;   
    }
     console.log(email) ;   
     console.log(password) ; 
     const user =  await User.findOne({email}).select("+password") ; 
     if(!user){ 
          return next(new ErrorHandler("Invalid email or password" , 401)) ;
     }   
   
     const isPasswordMatched = await  user.comparePassword(password); 
     console.log(isPasswordMatched)
     if(!isPasswordMatched){ 
          return next(new ErrorHandler("Invalid email or password"  , 401)) ;
     }  
      
     sendToken(user, 200 , res) ;
    }
)  

exports.logutUser = catchAsyncErrors(async (req,res,next)=>{  
    console.log("here"); 
    res.cookie("token" , null , {expires: new Date(Date.now()) , httpOnly: true ,}); 
    res.status(200).send(
        {
            success:"true" , 
            message:"logged Out" 
        })
})     
