import { Category } from "../database/entities/Category.js";
import { Hotline } from "../database/entities/Hotline.js";
import { Shop } from "../database/entities/Shop.js";
import { AppError } from "../errors/AppErrors.js";
import  { Request, Response} from "express";

export const createShop = async(payload : Shop, hotlineId : number)=>{
    const shop = await Shop.findOne({ where: { email: payload.email } })

    if (shop) {
        throw new AppError("Product already exists",409,true)
    }
    const hotline = await Hotline.findOne({ where: { id: hotlineId } })

    if (!hotline) {
        throw new AppError("address dose not exists", 404, true)
    }
    const newshop = await Shop.create({
        ...payload,
        hotline
       }).save()

    return newshop
}
export const getSingleShop = async (Id: any) => {
    const shop = await Shop.findOne({ where: { id: Id } })

    if (!shop) {
        throw new AppError("Shop not found", 404, true)
    }

    return shop
}

export const getAllShop = async (req: Request, res:Response) => {
    
    const shops  = await Shop.find()
 
    res.json({
        message: "getting all shops successfully",
        status: true,
        shops: shops
    })
}