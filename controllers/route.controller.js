import details from "../models/details.js";
import addressDetails from "../models/address.js"

export const getById = async (req, res, next) => {
    try {
        const userId = await details.find({
            userId: { $regex: '^' + req.params.key}
        })
        res.json(userId)
        if (!userId)
            return next(404, "No userId found")
    } catch (error) {
        return next(500, "internal server error")
    }
}

export const getAddress = async (req, res, next) => {
    try {
        const userId = await addressDetails.find({
            userId: { $regex: '^' + req.params.key }
        });
        res.json(userId)
        if (!userId)
            return next(404, "No userId found")
    } catch (error) {
        return next(500, "internal server error")
    }
}

export const getAddressById=async (req, res, next)=>{
    try{
        const addressId=await addressDetails.findById({_id:req.params.id})
        if(addressId){
            return res.status(200).json(addressId)
        } else{
            return res.status(404).json("address not found...")
        }
    }catch(error){
        return res.status(500).json('Internal server error!');
    }
}

export const updateAddress = async (req, res, next) => {
    try {
        const userId = await addressDetails.findById({ _id: req.params.id })
        if (userId) {
            await addressDetails.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).json("Address updated")

        } else {
            return res.status(404).json("address not found...")
        }
    } catch (error) {
        return res.status(500).json('Internal server error!');
    }
}

export const deleteAddress = async (req, res, next) => {
    try {
        const userId = await addressDetails.findById({ _id: req.params.id })
        if (userId) {
            await addressDetails.findByIdAndDelete(userId);
            return res.status(200).json("Address deleted")

        } else {
            return res.status(404).json("address not found...")
        }
    } catch (error) {
        return res.status(500).json('Internal server error!');
    }
}

export const bestSellers = async (req, res, next) => {
    try {
        const bestSellers = await details.aggregate([
            {
                $unwind: "$products"
            },
            {
                $match: {
                    "products.productCategory": req.params.key // Filter by productCategory
                }
            },
            {
                $group: {
                    _id: "$products.productId",
                    productName: { $first: "$products.productName" },
                    productBrand: { $first: "$products.productBrand" },
                    productCategory:{$first: "$products.productCategory"},
                    productType:{$first: "$products.productType"},
                    productId: { $first: "$products.productId" },
                    productCost: { $first: "$products.productCost" },
                    productDiscount: {$first:"$products.productDiscount"},
                    productImage: { $first: "$products.productImage" },
                    quantity: { $sum: "$products.quantity" }
                }
            },
            { $sort: { quantity: -1 } },
            { $limit: 100 }
        ]);
        return res.status(200).json(bestSellers);
    } catch (error) {
        return next(error); // Pass the error object to the next middleware
    }
};

export const bestSellersAll = async (req, res, next) => {
    try {
        const bestSellers = await details.aggregate([
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: "$products.productId",
                    productName: { $first: "$products.productName" },
                    productBrand: { $first: "$products.productBrand" },
                    productCategory:{$first: "$products.productCategory"},
                    productType:{$first: "$products.productType"},
                    productId: { $first: "$products.productId" },
                    productCost: { $first: "$products.productCost" },
                    productDiscount: {$first:"$products.productDiscount"},
                    productImage: { $first: "$products.productImage" },
                    quantity: { $sum: "$products.quantity" }
                }
            },
            { $sort: { quantity: -1 } },
            { $limit: 100 }
        ]);
        return res.status(200).json(bestSellers);
    } catch (error) {
        return next(error); // Pass the error object to the next middleware
    }
};
