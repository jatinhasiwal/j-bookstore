import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
        
    },
    
    address: {
        type: String,
        required: true,
    },
    
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Book",
        }
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Book",
        }
    ],
    
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Order",
        }
    ],
    
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

export default User