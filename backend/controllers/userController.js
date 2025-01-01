import ErrorHandler from "../middlewares/error.js";

export const register = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Profile Image Required.", 400))
    }

    const { profileImage } = req.files

    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp']
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
    if (role == "Auctioneer") {
        if(!bankAccountName || !bankAccountNumber || !bankName) {
            return next(new ErrorHandler("Enter All Bank Details"))
        }
    }
};