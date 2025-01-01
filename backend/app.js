import { config } from "dotenv";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";

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
    userTempFiles: true,
    tempFileDir: "/tmp/"
}))

connection();
app.use(errorMiddleware)

export default app