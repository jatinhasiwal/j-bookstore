import express from "express"
import { addtocart, getUserCart, removeCartBook } from "../controller/add-to-cart-controller.js"

const cartRoute = express.Router()
cartRoute.put("/add-to-cart", addtocart)
cartRoute.put("/remove-from-cart/:bookid", removeCartBook)
cartRoute.get("/get-user-cart", getUserCart)
export {cartRoute}