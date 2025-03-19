// Login Code
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
 
    if (!userExist) {
      return res.status(400).json({ message: "Invaild Credentials" });
    } 
    const isPasswordValid = await userExist.ComparePassword(password); 
    if (isPasswordValid) {
      res.status(200).json({
        msg: "login successful",
        _token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invaild email or Password" });
    }
  } catch (error) {
    console.log("err", error);
  }
};

const Signup = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const userCreated = await User.create({ username, email, phone, password });

    res.status(200).json({
      msg: "user created",
      _token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log("err", error);
  }
};

module.exports = { Login, Signup };
