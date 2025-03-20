const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, "Username atleast 3 character")
    .max(50, "Username max 50 character"),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invaild email address" })
    .min(3, "Username atleast 3 character")
    .max(155, "email max 155 character"),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, "phone atleast 3 character")
    .max(20, "Username max 20 character"),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, "Password atleast 6 character")
    .max(1024, "Password max 1024 character"),
});


module.exports = signupSchema; 