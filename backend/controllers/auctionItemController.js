import { Auction } from "../models/auctionSchema.js"
import { User } from "../models/userSchema.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"
import cloudinary from "cloudinary"

export const addNewAuctionItem = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Auction Item Image Required.", 400))
    }

    const { image } = req.files

    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg',]
    if (!allowedFormats.includes(image.mimetype)) {
        return next(new ErrorHandler("File format not supported", 400))
    }

    const {
        title,
        description,
        category,
        condition,
        startingBid,
        currentBid,
        startTime,
        endTime
    } = req.body;

    if (!title || !description || !category || !condition || !startingBid || !startTime || !endTime) {
        return next(new ErrorHandler("Please provide all details.", 400))
    }
    if (new Date(startTime) < Date.now()) {
        return next(new ErrorHandler("Auction starting time must be greater than present time.", 400))
    }
    if (new Date(startTime) >= new Date(endTime)) {
        return next(new ErrorHandler("Auction Time must be less than the time.", 400))
    }


    const alreadyOneAuctionActive = await Auction.find({
        createdBy: req.user._id,
        endTime: { $gt: Date.now() },
    })
    
    if (alreadyOneAuctionActive.length>0) {
        return next(new ErrorHandler("You already have one active auction",400));
    }

    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "AUCTION_PLATFORM_AUCTIONS",
        });
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown cloudinary error")
            return next(new ErrorHandler("failed to upload auction image to cloudinary", 500));
        }

        const auctionItem = await Auction.create({
            title,
            description,
            category,
            condition,
            startingBid,
            startTime,
            endTime,
            image: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            },
            createdBy: req.user._id
        })

        return res.status(201).json({
            success: true,
            message: `Auction item created and will be listed on auction page at ${startTime}`,
            auctionItem,
        })

    } catch (error) {
        return next(new ErrorHandler(error.message || "Failed to create auction", 500))
    }
})