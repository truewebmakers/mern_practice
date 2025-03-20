require('dotenv').config(); 
const express = require("express");
const app = express();
const PORT = 5000;
const connectDb = require('./utils/db'); 

const router = require("./router/auth-router"); // Router defined 


app.use(express.json());

app.get('/',(req,res) =>{
  res.status(200).send("welcome to Mern this is Practice here"); 
});

app.use("/api/v1", router);

connectDb().then(()=> {
    app.listen(PORT, () => {
        console.log("server is running at " + PORT);
      });
      
}); 
