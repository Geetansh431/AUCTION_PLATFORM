import cron from "node-cron"
import { Auction } from "../models/auctionSchema.js"
import { User } from "../models/userSchema.js"
import { sendEmail } from "../utils/sendEmail.js"
import { calculateCommission } from "../controllers/commissionController.js"
import { Bid } from "../models/bidSchema.js"

export const endedAuctionCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        const now = new Date();
        console.log("Cron for ended auction running")
        const endedAuctions = await Auction.find({
            endTime: { $lt: now },
            commissionCalculated: false,
        });
        
        for (const auction of endedAuctions) {
            try {
                const commissionAmount = await calculateCommission(auction._id);
                auction.commissionCalculated = true;
                
                // Find the highest bid for this auction
                const highestBid = await Bid.findOne({
                    auctionItem: auction._id
                }).sort({ amount: -1 });

                if (highestBid) {
                    const auctioneer = await User.findById(auction.createdBy);
                    const bidder = await User.findById(highestBid.bidder.id);
                    
                    // Update auction with winner
                    auction.highestBidder = highestBid.bidder.id;
                    await auction.save();
                    
                    // Update bidder's statistics
                    await User.findByIdAndUpdate(
                        bidder._id,
                        {
                            $inc: {
                                moneySpent: highestBid.amount,
                                auctionsWon: 1,
                            },
                        },
                        { new: true }
                    );
                    
                    // Update auctioneer's commission
                    await User.findByIdAndUpdate(
                        auctioneer._id,
                        {
                            $inc: {
                                unpaidComission: commissionAmount,
                            },
                        },
                        { new: true }
                    );
                    
                    // Send email to winner
                    const subject = `Congratulations! You won the auction for ${auction.title}`;
                    const message = `Dear ${bidder.userName}, \n\nCongratulations! You have won the auction for ${auction.title}. \n\nBefore proceeding for payment contact your auctioneer via your auctioneer email:${auctioneer.email} \n\nPlease complete your payment using one of the following methods:\n\n1. **Bank Transfer**: \n- Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName} \n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber} \n- Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **Razorpay**:\n- You can send payment via razorpay: ${auctioneer.paymentMethods.razorpay.razorpayAccountNumber}\n\n3. **PayPal**:\n- Send payment to: ${auctioneer.paymentMethods.paypal.paypalEmail}\n\n4. **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n- To pay the 20% upfront, use any of the above methods.\n- The remaining 80% will be paid upon delivery.\n- If you want to see the condition of your auction item then send your email on this: ${auctioneer.email}\n\nPlease ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\nThank you for participating!\n\nBest regards,\nGeetansh Auction Team`;
                    
                    console.log("SENDING EMAIL TO HIGHEST BIDDER");
                    sendEmail({ email: bidder.email, subject, message });
                    console.log("SUCCESSFULLY EMAIL SEND TO HIGHEST BIDDER");
                } else {
                    await auction.save();
                }
            } catch (error) {
                console.error("Error in ended auction cron:", error);
            }
        }
    });
}