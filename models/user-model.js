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
        default: "https://img.freepik.com/free-photo/3d-portrait-businessman_23-2150793877.jpg?w=360&t=st=1729312894~exp=1729313494~hmac=6f75eb3226b826f8819c8a7da5d53f0e309c0ea8a9ad3593572a55a7f405c546
"
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
