import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js"
import { v2 as cloudinary } from "cloudinary"
import { generateToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Profile Image Required.", 400))
    }

    const { profileImage } = req.files

    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg',]
    if (!allowedFormats.includes(profileImage.mimetype)) {
        return next(new ErrorHandler("File format not supported", 400))
    }

    const {
        userName,
        email,
        password,
        phone,
        address,
        role,
        bank,
        bankAccountNumber,
        bankAccountName,
        bankName,
        razorpayAccountNumber,
        paypalEmail,
    } = req.body;

    if (!userName || !password || !email || !phone || !password || !role || !address) {
        return next(new ErrorHandler("Please enter all user details", 400))
    }

    if (role === "Auctioneer") {
        if (!bankAccountName || !bankAccountNumber || !bankName) {
            return next(
                new ErrorHandler("Please provide your full bank details.", 400)
            );
        }
        if (!razorpayAccountNumber) {
            return next(
                new ErrorHandler("Please provide your razorpay account number.", 400)
            );
        }
        if (!paypalEmail) {
            return next(new ErrorHandler("Please provide your paypal email.", 400));
        }
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("User already registered", 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath, {
        folder: "AUCTION_PLATFORM_USERS",
    });
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown cloudinary error")
        return next(new ErrorHandler("failed to upload profile image to cloudinary", 500));
    }
    const user = await User.create({
        userName,
        email,
        password,
        phone,
        address,
        role,
        profileImage: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
        paymentMethods: {
            bankTransfer: {
                bankAccountNumber,
                bankAccountName,
                bankName
            },
            razorpay: {
                razorpayAccountNumber
            },
            paypal: {
                paypalEmail
            },
        },
    });

    generateToken(user, "User Registered.", 201, res)
})
