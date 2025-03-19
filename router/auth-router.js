const express = require('express'); 
const router = express.Router(); 
const {Login,Signup} = require('../controllers/auth-controller')


// Routes defined for the applcation 
router.get('/',(req,res) =>{
    res.status(200).send("Routers welcome"); 
});

router.route('/login').post(Login);
router.route('/signup').post(Signup);

 


module.exports = router; 