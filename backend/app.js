import { config } from "dotenv";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js"
import fileUpload from "express-fileupload";

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
// app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/user",userRouter)

connection();
app.use(errorMiddleware)

export default app