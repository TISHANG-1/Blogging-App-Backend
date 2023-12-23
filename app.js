const express = require('express') ; 
const cookieParser =  require('cookie-parser') ; 
const app = express() ;  
const bodyParser =  require("body-parser") ; 
const fileUpload = require("express-fileupload") ; 
const cors  = require('cors');   

app.use(cookieParser()) ; 
app.use(express.json());     
app.use(bodyParser.urlencoded({extended: true}))  ; 
app.use((req, res, next) => {
  // Set the allowed origins
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend domain

  // Set the allowed methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Set the allowed headers
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Allow credentials (cookies, authorization headers) to be sent
  res.header('Access-Control-Allow-Credentials', true);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }

  next();
});


app.use
(fileUpload()) ;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  }); 
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(cors({origin: true, credentials: true}));
const errorMiddleware = require("./middleware/error");
// app.use('/'  , require('routes/productRoute.js/router')) ;
// importing the routes in the app  , overall everything we import here is ultimately sent to the server side of the file (server.js) ;

app.use(errorMiddleware) ;    


// user routes 
const user = require('./routes/userRoutes') ; 
const blog = require('./routes/blogRoutes') ; 
app.use("/api/v1" , user) ; 
app.use("/api/v1" , blog); 
module.exports = app ; 


