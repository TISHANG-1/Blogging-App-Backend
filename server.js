const app =  require('./app') ; 
const dotenv  =  require('dotenv') ;  
const axios =  require("axios") ;
const cors = require('cors');

dotenv.config({path:"D:\\Assignment_Leviation\\config.env"})  

// Handling uncaught exception  

process.on("uncaughtException", (err)=>{   console.log('Error :') ; 
console.log(err.message) ; 
console.log('Shutting Down the server due to uncaught Exception'); 
server.close(()=>{
   process.exit(1); }) 

})    
const morgan  =  require('morgan') ; 
const connectDatabase =  require("./Database/database");

// connecting to database


app.use(morgan('tiny')) ;   


connectDatabase().then(()=>{
app.listen(process.env.PORT || 3000 , ()=> {console.log(`server is working on  http://localhost:${process.env.PORT}`)});} )
.catch((err)=>{ 
    console.log(err); 
})




// unhandled promise rejection
process.on("unhandledRejection" , err =>{console.log('Error :') ; 
   console.log(err.message) ; 
   console.log('Shautting Down the server due to unhandled promise'); 
   server.close(()=>{
      process.exit(1); 

   })  ;   
});   


