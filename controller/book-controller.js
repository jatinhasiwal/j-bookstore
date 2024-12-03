import User from "../models/user-model.js";
import Book from "../models/book-model.js";
import { authenticateToken } from "../Router/userAuth-route.js";

const addBook = (authenticateToken, async (req, res) =>{
    try {
        const {id} = req.headers
        const user = await User.findById(id)
        if(user.role !== "admin"){
            return res.status(400).json({message: "You have no access to add book. only done by admin"})
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,    
        })
        await book.save()
        return res.status(200).json({message: "Book added sucessfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

export {addBook}

// update book --------------------------------------------------

const updateBook = (authenticateToken, async (req, res) =>{
    try {
        const { bookid } = req.headers
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language, 
        })
        return res.status(200).json({message: "Book Updated sucessfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

export {updateBook}

// Delete book ------------------------------------

const deleteBook = (authenticateToken, async (req, res) =>{
    try {
        const {bookid} = req.headers
        await Book.findByIdAndDelete(bookid)
        res.status(200).json({message: "Book deleted sucessfully"})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})
export {deleteBook}

// getbook from database----------------------------------

const getbook = async (req, res) =>{
    try {
        const books = await Book.find().sort({createdAt: -1})
        return res.json({
            status: "Sucess",
            data: books
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}
export {getbook}

// get recentlly added 4 books only --------------------

const getrecentbook = async (req, res) =>{
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(4)
        return res.json({
            status: "Sucess",
            data: books
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}
export {getrecentbook}

// get one book by Id-------------

const getonebookByID = async (req, res) =>{
    try {
        const {id} = req.params
    const book = await Book.findById(id)
    return res.json({
        status: "Sucess",
        data: book
    })
    
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}

export {getonebookByID}