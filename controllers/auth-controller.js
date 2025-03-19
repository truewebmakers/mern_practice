

// Login Code 

const User = require('../models/user-model'); 

const Login = async (req,res) => {
    try {
        console.log("reqq",req.body); 
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        res.status(200).json(
            {
                message : req.body
            }
        );  
        
    } catch (error) {
        console.log("err",error); 

    }

}

const Signup = async (req,res) => {
    try {

        const {username, email , phone, password } = req.body; 

        const userExist = await User.findOne({email:email}); 

        if(userExist){
            return res.status(400).json({message : "User already exist"}); 
        }
        const userCreated =  await User.create({username, email , phone, password}); 

        res.status(200).json({msg:userCreated});
        
    } catch (error) {
        console.log("err",error); 

    }

}


module.exports ={Login,Signup};