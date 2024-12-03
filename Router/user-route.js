import express from "express";
import { signup } from "../controller/user-controller.js";
import { login } from "../controller/user-controller.js";
import { getUserInfo } from "../controller/user-controller.js";
import { updateAdress } from "../controller/user-controller.js";
const userRoute = express.Router()
userRoute.post("/signup", signup)
userRoute.post("/login", login)
userRoute.get("/get-userinfo", getUserInfo)
userRoute.put("/updateaddress", updateAdress)
export default userRoute