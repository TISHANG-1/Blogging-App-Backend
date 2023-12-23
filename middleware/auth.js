const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors"); 
const jwt = require("jsonwebtoken") ; 
const User = require("../models/userModel");

exports.isAuthenticatedUser =  catchAsyncErrors(async(req ,res , next) => {
     console.log(req);  
     console.log("i m here") ;
     const token  =  req.cookies.token ;     
    
     console.log(token );
     // {token} = req.cookie    
     // console.log(token)
     if(!token){
          return next(new ErrorHandler("Please Login to access this resource" , 401)) ; 
     }
     console.log(token) ; 
     const decodeData =  jwt.verify(token , process.env.JWT_SECRET) ;  
     req.user = await User.findById(decodeData.id) ;  
     next() ; 
})   


exports.authorizedRoles = (...roles)=>{  

     return  (req , res , next)=>{ 
          if(!roles.includes(req.user.role)){ 
             return next ( new ErrorHandler(`Roles: ${req.user.role} is not allowed to access this resource`  , 403) ) ; 
          }   
          next() ; 
     }  ; 
}
