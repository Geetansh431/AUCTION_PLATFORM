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
import commissionRouter from "./router/commissionRouter.js"
import superAdminRouter from "./router/superAdminRoutes.js"
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js"
const app = express();
config({
    path: "./config/config.env"
})


app.use(cors({
    origin: ["https://bidbazzar.vercel.app", "https://auction-platform-ojz0.onrender.com"],
    methods: ['POST', "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie']
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
app.use("/api/v1/commission", commissionRouter)
app.use("/api/v1/superadmin", superAdminRouter)

endedAuctionCron();
verifyCommissionCron()

connection();
app.use(errorMiddleware)

export default app