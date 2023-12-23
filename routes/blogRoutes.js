const express  = require('express') ; 
const router  = express.Router();  

const blogs  = require('../controllers/blogController');  
const auth  = require('../middleware/auth.js');   

// get all the blogs in the backend, everyone can access it
router.route('/blogs').get(blogs.getAllBlogs); 

// get a particular blog, everyone can access
router.route('/blogs/:id').get(blogs.getBlogDetails) ; 

// create a new blog, it can only be done by someone who is already logged in
router.route('/blogs/new').post(auth.isAuthenticatedUser,auth.authorizedRoles("User") ,  blogs.createBlog) ; 

// update an existing blog 
router.route('/blogs/update/:id').put(auth.isAuthenticatedUser , auth.authorizedRoles("User") ,blogs.updateBlog);  

// delete an existing blog
router.route('/blogs/delete/:id').put(auth.isAuthenticatedUser,auth.authorizedRoles("User") , blogs.deleteBlog);

module.exports = router ; 


