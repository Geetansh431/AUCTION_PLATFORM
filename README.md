# Auction Platform

A full-featured auction platform built with the MERN (MongoDB, Express.js, React.js, Node.js) stack that enables users to create, manage, and participate in online auctions.

## Features

### User Roles
- **Admin Dashboard**: Complete auction oversight and platform management
- **Auctioneer Dashboard**: Create and manage auctions
- **Bidder Dashboard**: Place bids and track auctions
- **Super Admin**: Commission management and platform supervision

### Key Functionalities
- Secure user authentication and authorization
- Real-time auction updates
- Automated bid processing
- Commission tracking system
- User profile management
- Responsive design for all devices

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.0 or higher)
- MongoDB (version 4.0 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone https://github.com/Geetansh431/AUCTION_PLATFORM.git
cd AUCTION_PLATFORM

cd backend
npm install

# Server Configuration
PORT=4000

# MongoDB Configuration
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password

Usage
```
Register as a new user
Choose your role (Auctioneer/Bidder)
If you're an auctioneer:

Create new auctions
Set starting prices and duration
Monitor active auctions


If you're a bidder:

Browse available auctions
Place bids on items
Track your bidding history

# Acknowledgments

Thanks to all contributors who have helped with this project
Special thanks to the MERN stack community
