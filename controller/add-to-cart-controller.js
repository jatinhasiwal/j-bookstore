import { authenticateToken } from "../Router/userAuth-route.js";
import User from "../models/user-model.js";
const addtocart = (authenticateToken, async (req, res) => {
    try {
        const {id, bookid} = req.headers
    const userData = await User.findById(id)
    const bookData = userData.cart.includes(bookid)
    if(bookData){
        res.json({
            status: "Sucess",
            message: "Book already added to cart"
        })
    }
    else{
   await User.findByIdAndUpdate(id, {$push: {cart: bookid}})
   res.json({
    status: "Sucess",
    message: "Book added to cart"
   })
}
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})
export {addtocart}


// remove book from the cart --------------------------------


const removeCartBook = (authenticateToken,async(req, res) => {
    try {
        const{bookid} = req.params
        const {id} = req.headers
    const userData = await User.findById(id)
    const bookData = userData.cart.includes(bookid)
    if(bookData){
        await User.findByIdAndUpdate(id, {$pull: {cart: bookid}})
        res.status(200).json({message: "Book removed from cart"})
    }
    } catch (error) {
        res.status.json({message: "An error occured"})
    }
})
export {removeCartBook}

//  get cart of a particular user


const getUserCart = (authenticateToken, async(req, res) =>{
      try {
        const {id} = req.headers
        const userData = await User.findById(id).populate("cart")
        const cart = userData.cart.reverse()
        res.json({
         status: "Sucess",
         data: cart
        })
      } catch (error) {
        res.status(500).json({message: "Internal server error"})
      }
})

export {getUserCart}