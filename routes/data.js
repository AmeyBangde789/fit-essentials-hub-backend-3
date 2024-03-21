import express from 'express';
import { Details, orderDetails } from '../controllers/data.controller.js';
import { bestSellers, bestSellersAll, deleteAddress, getAddress, getAddressById, getById, updateAddress } from '../controllers/route.controller.js';

const router= express.Router();


router.post("/order-data", orderDetails  )

router.get("/getbyid/:key", getById)

router.post("/address", Details)

router.get("/getaddress/:key", getAddress)

router.get("/getAddressbyid/:id", getAddressById)

router.get('/bestsellers/:key',bestSellers)
router.get('/bestsellersall',bestSellersAll)

router.put("/update/:id", updateAddress)

router.delete("/delete/:id",deleteAddress)

export default router