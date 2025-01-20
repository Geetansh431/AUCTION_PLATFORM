import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "./error.js"

export const trackComissionStatus = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user.unpaidComission > 0) {
        return next(new ErrorHandler("You have unpaid commisions. Please pay before posting a new auction.", 403))
    }
    next();
})