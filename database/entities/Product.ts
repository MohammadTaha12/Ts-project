import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Shop } from "./Shop.js";
import { Category } from "./Category.js";

@Entity("")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => Shop, shop => shop.products)
    shop: Partial<Shop>
    
    @ManyToMany(() => Category, category => category.products)
    @JoinTable({
     name : "product_category"
    })
    categorys: Category[]
 }

