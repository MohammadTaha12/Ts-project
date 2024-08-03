import  { Router, Request, Response, NextFunction } from "express";
import { Product } from "../database/entities/Product.js";
import { createProduct, getAllProduct, getSingleProduct } from "../controller/product.js";

const router = Router();

router.post("/", async (req: Request, res: Response, next:NextFunction) => {
    try {
        const payload:Product = req.body
        if (!payload.name||!payload.price||!req.body.shopId||!req.body.categorysIds) {
            return res.status(400).json({
                message: "some fields are missing ",
                success: false
            })
        }

        const shop =  await createProduct(payload,req.body.shopId,req.body.categorysIds)
        res.status(201).json({
            message: "Product created successfully",
            success: true,
            data: shop  
        })

    } catch (error) {
        next(error)
    }
})
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id
        const product = await getSingleProduct(productId)

        console.log("entered");


        res.json({
            message: "Product created successfully",
            product: product
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})
router.get("/",  getAllProduct)
export default router