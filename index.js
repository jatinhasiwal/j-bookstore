import express from "express"
import cors from "cors"
import { dbConnection } from "./db/dbConnection.js"
import dotenv from "dotenv"
import userRoute from "./Router/user-route.js"
import { bookRoute } from "./Router/book-route.js"
import favouriteBookRoute from "./Router/favourite-book-route.js"
import { cartRoute } from "./Router/add-to-cart-route.js"
import { orderRoute } from "./Router/order-route.js"
dotenv.config()
const app  = express()
app.use(cors())
const PORT = process.env.PORT || 3001
app.use(express.json())


// Database connection --------------------------
dbConnection()

// Defining route-----------------------------------------
app.use("/user", userRoute)
app.use("/book", bookRoute)
app.use("/favouritebook", favouriteBookRoute)
app.use("/cart", cartRoute)
app.use("/order", orderRoute)
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})