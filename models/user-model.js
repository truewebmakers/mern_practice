const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Secure the password

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
});

// jwt token genertate

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRECT,
      { expiresIn: "1d" }
    );
  } catch (error) {
    console.log(error);
  }
};
// jwt compare method

userSchema.methods.ComparePassword = async function (pass) {
    try {
      return  await bcrypt.compare(pass,this.password); 
    } catch (error) {
      console.log(error);
    }
  };


//  define model and collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;
