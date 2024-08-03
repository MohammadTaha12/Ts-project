import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product.js";

@Entity("")
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Product, product => product.categorys)
    products: Product[]

}