import express from "express"
import { authenticateToken } from "../Router/userAuth-route.js";
import User from "../models/user-model.js";

// add book to favourite

const addFavouriteBook = (authenticateToken,async (req, res) =>{
    try {
        const {bookid, id} = req.headers
        const userData = await User.findById(id)
        const isBookFavourite = userData.favourites.includes(bookid)
        if(isBookFavourite){
            return res.status(200).json({message: "Book already in favourites"})
        }
        await User.findByIdAndUpdate(id, {$push: {favourites: bookid}})
        return res.status(200).json({message: "Book added to favourites"})
    } catch (error) {
        res.status(500).json({message: "Inernal server error"})
    }
})

export {addFavouriteBook}


// remove the book from favourite

const removeFavouriteBook = (authenticateToken,async (req, res) =>{
    try {
        const {bookid, id} = req.headers
        const userData = await User.findById(id)
        const isBookFavourite = userData.favourites.includes(bookid)
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, {$pull: {favourites: bookid}})
            return res.status(200).json({message: "Book removed from favourites"})
        }
        
    } catch (error) {
        res.status(500).json({message: "Inernal server error"})
    }
})

export {removeFavouriteBook}

// get the favourite book for a perticular user

const userFavouriteBooks = (authenticateToken,  async (req, res)=>{
    try {
        const {id} = req.headers
    const userData = await User.findById(id).populate("favourites")
    const favouriteiteBooks = userData.favourites
    res.json({
        status: "Sucess",
        data: favouriteiteBooks
    })
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

export {userFavouriteBooks}