const mongoose = require("mongoose");
const bcrypt = require('bcryptjs'); 


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
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("B4c0/\/", salt);
    user.password = hash; 
  } catch (error) {next(error)}
});

//  define model and collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;
