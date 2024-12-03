import { authenticateToken } from "../Router/userAuth-route.js";
import Order from "../models/order-model.js";
import User from "../models/user-model.js";

const order =
  (authenticateToken,
  async (req, res) => {
   try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDB = await newOrder.save();
    
    // saving order in user model ---------------------------------------
    await User.findByIdAndUpdate(id, {
      $push: { orders: orderDataFromDB._id },
    });
 
    //  clearing cart------------------------------------------------
    await User.findByIdAndUpdate(id, {
      $pull: {cart: orderData._id}
    })
  }
   return res.json({
      status: "Success",
      message: "Order Placed Successfully"
    })
   } catch (error) {
    return res.status(500).json({messge: "Internal server error"})
   }
  });
export {order}

// get order history of particular user -----------------------------

const orderHistory = (authenticateToken, async(req, res) => {
  try {
    const {id} = req.headers
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: {path: "book"}
    })

    const ordersData = userData.orders.reverse()
     return res.json({
      status: "Sucess",
      data: ordersData,
    })
  } catch (error) {
   return res.status(500).json({message: "Internal server error"})
  }
})
export {orderHistory}

// get all order ----admin

const adminSeeAllOrders = (authenticateToken, (req, res) => {
  try {
    const userData = Order.find().populate({
      path: "book"
    }).populate({
      path: "user"
    }).sort({
      createdAt: -1
    })
    return res.json({
      status: "Success",
      data: userData
    })
  } catch (error) {
   return res.status(500).json({message: "Internal server error"})
  }
})

export {adminSeeAllOrders}

// update the status of order by admin ---------------------

const updateOrderStatus = (authenticateToken, (req, res) => {
  try {
    const {id} = req.params
    Order.findByIdAndUpdate(id, {status: req.body.status})
    return res.json({
      status: "Success",
      message: "Status updated sucessfully"
    })
  } catch (error) {
    res.status(500).json({message: "Internal Server error"})
  }
})
export {updateOrderStatus}