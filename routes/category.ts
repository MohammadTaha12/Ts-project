import  { Router, Request, Response, NextFunction } from "express";
import { Category } from "../database/entities/Category.js";
import { createCategory, getAllCategory, getSingleCategory } from "../controller/category.js";

const router = Router();

router.post("/", async (req: Request, res: Response, next:NextFunction) => {
    try {
        const payload:Category = req.body
        if (!payload.name) {
            return res.status(400).json({
                message: "some fields are missing ",
                success: false
            })
        }

        const category =  await createCategory(req.body)
        res.status(201).json({
            message: "Category created successfully",
            success: true,
            data: category  
        })

    } catch (error) {
        next(error)
    }
})
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.id
        const category = await getSingleCategory(categoryId)

        console.log("entered");


        res.json({
            message: "category created successfully",
            category: category
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})
router.get("/",  getAllCategory)
export default router