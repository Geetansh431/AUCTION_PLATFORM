import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: [3, "Username must contains at least 3 characters"],
        maxLength: [40, "Username cannot exceed the limit of 40 characters"]
    },
    password: {
        type: String,
        select: false,
        minLength: [8, "Password must be atleast 8 characters"],
        maxLength: [32, "Password cannot exceed 32 Characters"],
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Please enter a valid email address",
        },
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        select: true,
        minLength: [10, "Phone Number must contain 10 Digits"],
        maxLength: [10, "Phone Number must contain 10 Digits"]
    },
    profileImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    paymentMethods: {
        bankTransfer: {
            bankAccountNumber: String,
            bankAccountName: String,
            bankName: String
        },
        razorpay: {
            razorpayAccountNumber: Number
        },
        paypal: {
            paypalEmail: String,
        },
    },
    role: {
        type: String,
        enum: ["Auctioneer", "Bidder", "Super Admin"]
    },
    unpaidComission: {
        type: Number,
        default: 0,
    },
    auctionsWon: {
        type: Number,
        default: 0
    },
    moneySpent: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export const User = mongoose.model("User", userSchema);