import  { Router, Request, Response, NextFunction } from "express";
import { Hotline } from "../database/entities/Hotline.js";
import { createHotline, getAllHotline, getSingleHotline } from "../controller/Hotline.js";


const router = Router();

router.post("/", async (req: Request, res: Response, next:NextFunction) => {
    try {
        const payload:Hotline = req.body
        if (!payload.hotlineNumber) {
            return res.status(400).json({
                message: "some fields are missing ",
                success: false
            })
        }

        const hotline =  await createHotline(req.body)
        res.status(201).json({
            message: "Hotline created successfully",
            success: true,
            data: hotline  
        })

    } catch (error) {
        next(error)
    }
})
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotlineId = req.params.id
        const hotline = await getSingleHotline(hotlineId)

        console.log("entered");


        res.json({
            message: "Hotline created successfully",
            hotline: hotline
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

router.get("/",  getAllHotline)
export default router