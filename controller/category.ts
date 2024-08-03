import { Category } from "../database/entities/Category.js"
import { AppError } from "../errors/AppErrors.js"
import  { Request, Response} from "express";

export const createCategory = async(payload : Category)=>{
    const category = await Category.findOne({ where: { name: payload.name } })

    if (category) {
        throw new AppError("Category already exists",409,true)
    }

    const newCategory = await Category.create(payload).save()

    return newCategory
}
export const getSingleCategory = async (Id: any) => {
    const category = await Category.findOne({ where: { id: Id } })

    if (!category) {
        throw new AppError("category not found", 404, true)
    }

    return category
}
export const getAllCategory = async (req: Request, res:Response) => {
    const categorys = await Category.find()

    res.json({
        message: "getting all categorys successfully",
        status: true,
        categorys: categorys
    })
}
