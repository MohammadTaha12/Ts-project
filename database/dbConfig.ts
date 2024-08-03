import { DataSource } from "typeorm";
import { Shop } from "./entities/Shop.js";
import { Product } from "./entities/Product.js";
import { Category } from "./entities/Category.js";
import { Hotline } from "./entities/Hotline.js";

const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "mydb",
    synchronize: true,
    logging: false,
    entities: [Shop,Product,Category,Hotline]
})
export default dataSource;