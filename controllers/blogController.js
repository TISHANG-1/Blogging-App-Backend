const Blog  = require('../models/blogModel'); 
const ErrorHandler = require('../utils/errorhandler'); 
const catchAsyncErrors = require('../middleware/catchAsyncErrors'); 


//  create A blog
exports.createBlog = catchAsyncErrors(
    async(req , res, next)=>{ 
        req.body.user = req.user.id ; 
        const blog  =  await Blog.create(req.body); 
        console.log("created a blog successfully") ; 
        res.status(201).send({
            success: true ,
            blog, 
        })

    }
); 

// update a Blog
exports.updateBlog = catchAsyncErrors(
    async(req , res, next)=>{  
        console.log("trying to update the blog"); 
        let blog  = await Blog.findById(req.params.id) ;  
        let user  = req.user.id ; 
        if(!blog){ 
            return next(new ErrorHandler("Blog not found" , 404)) ; 
        }  
        let user_ = String(blog.user);  
       if( user != user_){ 
             return next(new ErrorHandler("User Not matched" , 404)) ; 
        }  
        // req.body.updatedAt  = Date.now(); 
        blog = await Blog.findByIdAndUpdate(req.params.id , req.body , {new: true , runValidators: true , 
        useFindAndModify: false});   
        res.status(200).send({
            success: true , 
            message: "update successfully"
        })
    }
); 

// delete A Blog
exports.deleteBlog = catchAsyncErrors(
    async(req , res , next)=>{ 
       const user  = req.user.id ; 
       const blog = await Blog.findById(req.params.id) ;  
       if(!blog){ 
           return next(new ErrorHandler("Blog not found" , 404)) ; 
       }  
       let user_ = String(blog.user);  
      if( user != user_){ 
            return next(new ErrorHandler("User Not matched" , 404)) ; 
       }  
        
    
       await Blog.findByIdAndDelete(req.params.id) ; 
       res.status(200).send({
         success: true , 
         message: "Blog deleted Successfully", 
       })
    }
)

// get All blogs
exports.getAllBlogs = catchAsyncErrors(
    async(req ,res , next)=>{ 
        const Blogs  = await Blog.find() ;   
          
        res.status(200).send({success:true , 
          Blogs});  
    }
)


// get the details of a single blog
exports.getBlogDetails = catchAsyncErrors( async(req , res , next)=>{ 
      const blog = await Blog.findById(req.params.id) ; 
      if(!blog){ 
         res.status(404).send({message: "Blog not found" })
      }  
      res.status(200).send({
         success: true , 
         blog, 
      })
})
