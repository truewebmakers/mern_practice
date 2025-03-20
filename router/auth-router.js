const express = require('express'); 
const router = express.Router(); 
const {Login,Signup} = require('../controllers/auth-controller');

const signupSchema = require('../validators/auth-validatior');
const validate = require('../middlewares/validate-middleware');

// Routes defined for the applcation 
router.route('/login').post(Login);
router.route('/signup').post(validate(signupSchema),Signup);

//  Routes ends here
module.exports = router; 