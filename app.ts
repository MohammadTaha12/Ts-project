import { Request, Response, Express } from "express";
import express from 'express'
import env from "dotenv";
import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandler.js";
import dataSource from "./database/dbConfig.js";
import shopRoute from "./routes/shop.js"
import productRoute from "./routes/product.js"
import categoryRoute from "./routes/category.js"
import hotlineRoute from "./routes/hotline.js"


const app: Express = express();
const PORT = process.env.PORT || 5000;
env.config();
app.use(express.json())
const Root: "/" = "/";

// Route.
app.get(Root, (req: Request, res: Response) => {
    res.send("hello world");
})

app.get("/data", (req: Request, res: Response) => {
    res.json({
        data: 'success',
        Type: true,
    });

})

app.use("/shop", shopRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/hotline", hotlineRoute);
app.use(customErrorHandler)

app.use(DefaultErrorHandler)

dataSource.initialize().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});

app.listen(PORT, () => {
    console.log(`server is running on host: http://localhost:${PORT}`);
});


