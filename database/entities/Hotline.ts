import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Shop } from "./Shop.js";

@Entity("")
export class Hotline extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    hotlineNumber: number;

    @OneToOne(() => Shop, shop => shop.hotline)
    shop: Partial<Shop>
}