import { config } from "dotenv";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js"
import fileUpload from "express-fileupload";
import auctionItemRouter from "./router/auctionItemRoutes.js"
import bidRouter from "./router/bidRoutes.js"

const app = express();
config({
    path: "./config/config.env"
})


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['POST', "GET", "PUT", "DELETE"],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true, // Correct setting for temporary file storage
    tempFileDir: "/tmp/" // Directory for temporary files
}));

app.get("/", (req, res) => {
    console.log("Test endpoint hit!");
    res.status(200).json({
        success: true,
        message: "API is working correctly!"
    });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);

connection();
app.use(errorMiddleware)

export default app