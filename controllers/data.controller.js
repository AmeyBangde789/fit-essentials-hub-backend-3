import details from "../models/details.js";
import addressDetails from "../models/address.js"


export const orderDetails =async (req, res, next )=>{
    const orderData = new details({
        customerName:req.body.customerName,
        customerAddress:req.body.customerAddress,
        orderCost: req.body.orderCost,
        paymentMode:req.body.paymentMode,
        userId:req.body.userId,
        products:req.body.products
    });
    await orderData.save();
    return res.status(200).json("delivery data success");
}
export const Details =async (req, res, next )=>{
    const orderData = new addressDetails({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address,
        town:req.body.town,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        pincode: req.body.pincode,
        userId:req.body.userId,
        deliverAt:req.body.deliverAt
    });
    await orderData.save();
    return res.status(200).json("delivery data success");
}
