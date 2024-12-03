import express from "express"
import { addFavouriteBook, removeFavouriteBook, userFavouriteBooks } from "../controller/favourite-book-controller.js"

const favouriteBookRoute = express.Router()
favouriteBookRoute.put("/add-book-to-favourite", addFavouriteBook)
favouriteBookRoute.put("/remove-favourite-book", removeFavouriteBook)
favouriteBookRoute.get("/user-favourite-books", userFavouriteBooks)
export default favouriteBookRoute