import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auctionSchema.js";
import { Bid } from "../models/bidSchema.js";
import { User } from "../models/userSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const auctionItem = await Auction.findById(id);
    if (!auctionItem) {
        return next(new ErrorHandler("Auction Item not found.", 404));
    }
    const { amount } = req.body;

    if (!amount) {
        return next(new ErrorHandler("Please place your bid", 404));
    }
    if (amount <= auctionItem.currentBid) {
        return next(new ErrorHandler("Bid amount must be greater than the current bid.", 404));
    }
    if (amount < auctionItem.startingBid) {
        return next(new ErrorHandler("Bid amount must be greater than the starting bid.", 404));
    }

    try {
        const bidderDetail = await User.findById(req.user._id);
        
        // Find existing bid for this user in this auction
        const existingBid = await Bid.findOne({
            "bidder.id": req.user._id,
            auctionItem: auctionItem._id,
        });

        // Find existing bid in auction's bids array
        const existingBidIndex = auctionItem.bids.findIndex(
            (bid) => bid.userId.toString() === req.user._id.toString()
        );

        if (existingBid && existingBidIndex !== -1) {
            // Update existing bid
            existingBid.amount = amount;
            await existingBid.save();
            
            // Update bid in auction's bids array
            auctionItem.bids[existingBidIndex].amount = amount;
        } else {
            // Create new bid
            const newBid = await Bid.create({
                amount,
                bidder: {
                    id: bidderDetail._id,
                    userName: bidderDetail.userName,
                    profileImage: bidderDetail.profileImage?.url,
                },
                auctionItem: auctionItem._id,
            });

            // Add new bid to auction's bids array
            auctionItem.bids.push({
                userId: bidderDetail._id,
                userName: bidderDetail.userName,
                profileImage: bidderDetail.profileImage?.url,
                amount,
            });
        }

        // Update current bid
        auctionItem.currentBid = amount;
        await auctionItem.save();

        res.status(201).json({
            success: true,
            message: "Bid placed successfully.",
            currentBid: auctionItem.currentBid,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Failed to place bid.", 500));
    }
});