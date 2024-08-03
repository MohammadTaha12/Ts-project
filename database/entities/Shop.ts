import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { BeforeInsert } from "typeorm";
import bcrypt from "bcrypt"
import { Product } from "./Product.js";
import { Hotline } from "./Hotline.js";

@Entity("")
export class Shop extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    shopName: string;

    @Column()
    email: string;
    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @Column()
    password: string;

    @OneToMany(() => Product, product => product.shop)
    products: Partial<Product>[]

    @OneToOne(() => Hotline, hotline => hotline.shop)
    @JoinColumn({
        name: "hotlineId",
        referencedColumnName: "id"
    })

    hotline: Hotline
}