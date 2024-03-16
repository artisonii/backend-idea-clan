const { UserModel } = require("../models/users.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const registerResolver = async (_, { input }) => {
  const { name, email, password } = input;

  if (!(email && password && name)) {
    return { message: "Please fill all the details!", success: false };
  }

  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return { message: "User already exists, Please login!", success: false };
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await UserModel.create({
      ...input,
      password: hashedPassword,
    });

    if (user) {
      return { message: "User signed up successfully!", success: true };
    } else {
      return { message: "User registration failed!", success: false };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return { message: "Internal Server Error", success: false };
  }
};

const loginResolver = async (_, { input }) => {
  const { email, password } = input;

  if (!(email && password)) {
    return { message: "Please fill all the details!", success: false };
  }

  try {
    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      return { message: "User does not exist, Please Signup", success: false };
    }

    const result = await new Promise((resolve, reject) => {
      bcrypt.compare(password, userExist.password, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (result) {
      const token = jwt.sign(
        { role: userExist.role, userId: userExist._id },
        process.env.JWT_SECRET
      );

      return {
        message: "login successful",
        token: token,
        name: userExist.name,
        role: userExist.role,
        success: true,
      };
    } else {
      return { message: "wrong credentials!", success: false };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return { message: "Internal Server Error", success: false };
  }
};

module.exports = { registerResolver, loginResolver };
