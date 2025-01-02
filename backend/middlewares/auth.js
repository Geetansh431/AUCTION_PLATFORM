import { User } from "../models/userSchema.js"
import jwt from "jsonwebtoken"
import ErrorHandler from "./error.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ErrorHandler("User not authenticated.", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
})