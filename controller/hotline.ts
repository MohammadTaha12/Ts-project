import { Hotline } from "../database/entities/Hotline.js"
import { AppError } from "../errors/AppErrors.js"
import  { Request, Response} from "express";

export const createHotline = async(payload : Hotline)=>{
    const hotline = await Hotline.findOne({ where: { hotlineNumber: payload.hotlineNumber } })

    if (hotline) {
        throw new AppError("Hotline already exists",409,true)
    }

    const newHotline = await Hotline.create(payload).save()

    return newHotline
}
export const getSingleHotline = async (Id: any) => {
    const hotline = await Hotline.findOne({ where: { id: Id } })

    if (!hotline) {
        throw new AppError("hotline not found", 404, true)
    }

    return hotline
}
export const getAllHotline = async (req: Request, res:Response) => {
    const hotlines = await Hotline.find()

    res.json({
        message: "getting all hotlines successfully",
        status: true,
        hotlines: hotlines
    })
}