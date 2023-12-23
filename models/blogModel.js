const mongoose  = require('mongoose') ; 

const blogSchema = new mongoose.Schema(
 {
    user: {
        type : mongoose.Schema.ObjectId, 
        ref : "User" , 
        required: true, 
  } , 

  createdAt:{ 
      type: Date , 
      default: Date.now 
   },  
   updateAt: { 
     type: Date , 
     default : Date.Now, 
   }, 
   blog: { 
     type: String,   
     required:[true , "No blog entered"], 
   }

 }
)  
module.exports = mongoose.model("Blogs" , blogSchema) ; 