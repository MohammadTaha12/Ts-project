import  { Router, Request, Response, NextFunction } from "express";
import { Shop } from "../database/entities/Shop.js";
import { createShop, getAllShop, getSingleShop } from "../controller/shop.js";
const router = Router();

router.post("/", async (req: Request, res: Response, next:NextFunction) => {
    try {
        const payload:Shop = req.body
        if (!payload.shopName|| !payload.email|| !payload.password || !req.body.hotlineId) {
            return res.status(400).json({
                message: "some fields are missing ",
                success: false
            })
        }

        const libary =  await createShop(req.body,req.body.hotlineId)
        res.status(201).json({
            message: "Shop created successfully",
            success: true,
            data: libary
        })

    } catch (error) {
        next(error)
    }
})
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shopId = req.params.id
        const shop = await getSingleShop(shopId)

        console.log("entered");


        res.json({
            message: "shop created successfully",
            shop: shop
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})
router.get("/",  getAllShop)
export default router