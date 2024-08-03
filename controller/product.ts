import { In } from "typeorm";
import { Category } from "../database/entities/Category.js";
import { Product } from "../database/entities/Product.js"
import { AppError } from "../errors/AppErrors.js"
import  { Request, Response} from "express";
import { Shop } from "../database/entities/Shop.js";

export const createProduct = async(payload : Product ,shopId: string,categorysIds : number[] )=>{
    const shop = await Shop.findOne({ where: { id: shopId } })

    if (!shop) {
        throw new AppError("shopId already exists",409,true)
    }
    const categorys = await Category.find({ where: { id: In(categorysIds) } })
    if (categorys.length !== categorysIds.length) {
        throw new AppError("Some Categorys are not exists", 404, true)
    }
     const product = await Product.findOne({
        where:  {
            name : payload.name,
            price : payload.price,
        }
    })

    if (product) {
        throw new AppError("product already exists", 409, true)
    }
    const newproduct = await Product.create({
        ...payload , 
        shop
        ,categorys
    }).save()

    return newproduct
}

export const getSingleProduct = async (Id: any) => {
    const product = await Product.findOne({ where: { id: Id } })

    if (!product) {
        throw new AppError("Product not found", 404, true)
    }

    return product
}
export const getAllProduct = async (req: Request, res:Response) => {
    const products = await Product.find()

    res.json({
        message: "getting all products successfully",
        status: true,
        products: products
    })
}

