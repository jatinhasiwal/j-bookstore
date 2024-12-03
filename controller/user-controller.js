import express from "express";
import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../Router/userAuth-route.js";
const signup = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    // check username length is more than 4------------------------------
    if (username.length <= 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }
    // check username already exists in the database -----------------------
    const exitingUsername = await User.findOne({ username: username });
    if (exitingUsername) {
      return res.status(400).json({ message: "Username already exits" });
    }
    // check email already exists in the database -----------------------
    const exitingEmail = await User.findOne({ email: email });
    if (exitingEmail) {
      return res.status(400).json({ message: "email already exits" });
    }
    // check password length ----------------------------------------
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "Password length more than 6 character" });
    }
    // password encryption by using bycrptjs ----------------------------
    const hashPassword = await bcryptjs.hash(String(password), 10);

    //  Now give the permission to create a account-------------------------
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "SignUp sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Signup error: ", error);
  }
};
export { signup };

// login authentication handling------------------------------------------------

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    // jsonwebtoken -------------------------------------
    const authClaims = [
      { name: existingUser.username },
      { role: existingUser.role },
    ];
    const token = jwt.sign({ authClaims }, "bookStore123", {
      expiresIn: "30d",
    });
    // If everything is fine, send success message
    res
      .status(200)
      .json({message:"Login sucessfully", id: existingUser._id, role: existingUser.role, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { login };

// get - user - information after  authenticationToken verification------------

const getUserInfo = (authenticateToken, async(req, res) =>{
  try {
    const {id} = req.headers
    const data = await User.findById(id).select("-password")
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
})

export {getUserInfo}

// update the address information of the user ---------------------------------

const updateAdress = (authenticateToken, async (req, res) =>{
  try {
    const {id} = req.headers
  const {address} = req.body
  await User.findByIdAndUpdate(id, {address: address})
  return res.status(200).json({message: "Address updated sucessfully"})
  } catch (error) {
    return res.status(500).json({message: "Internal server error"})
  }
})
export {updateAdress}


