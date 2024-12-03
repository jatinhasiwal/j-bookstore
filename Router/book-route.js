import express from "express"
import { addBook, deleteBook, getbook, getonebookByID, getrecentbook } from "../controller/book-controller.js"
import { updateBook } from "../controller/book-controller.js"
const bookRoute = express.Router()
bookRoute.post("/add-book", addBook)
bookRoute.put("/update-book", updateBook)
bookRoute.delete("/delete-book", deleteBook)
bookRoute.get("/get-books", getbook)
bookRoute.get("/get-recent-books", getrecentbook)
bookRoute.get("/get-book-by-id/:id", getonebookByID)
export {bookRoute}