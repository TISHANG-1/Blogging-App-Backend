const express = require("express") ;
const router =  express.Router(); 
const user = require("../controllers/userController") ;   

// register the User
router.post("/register" , user.registerUser);   
// login the user, 
router.post('/login' , user.loginUser) ;   
// logout the user, 
router.route("/logout").get(user.logutUser) ;   

module.exports  = router ; 