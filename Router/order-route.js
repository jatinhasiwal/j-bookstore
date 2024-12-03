import express from "express";
import { order, orderHistory, updateOrderStatus } from "../controller/order-controller.js";

const orderRoute = express.Router()
orderRoute.post("/place-order", order)
orderRoute.get("/get-order-history", orderHistory)
orderRoute.put("/update-order-status", updateOrderStatus)
export {orderRoute}