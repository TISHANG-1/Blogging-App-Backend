const mongoose = require('mongoose') ; 

const connectDatabase = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
          console.log("MongoDB connected to server:");
          console.log(data.connection.host);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
module.exports =  connectDatabase; 