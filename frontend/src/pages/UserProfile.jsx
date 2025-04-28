import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTag, FaCalendarAlt, FaUnlockAlt } from "react-icons/fa";
import { FaMoneyBillTransfer, FaMoneyBillWave } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";

const UserProfile = () => {
    const { user, isAuthenticated, loading } = useSelector((state) => state.user);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigateTo("/");
        }
    }, [isAuthenticated]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:pl-72 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <motion.div 
                    className="text-[16px] flex flex-wrap gap-2 items-center mb-8"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link
                        to="/"
                        className="font-semibold text-gray-300 hover:text-indigo-400 transition-all duration-300"
                    >
                        Home
                    </Link>
                    <FaGreaterThan className="text-gray-500" />
                    <p className="text-gray-400">Profile</p>
                </motion.div>

                {loading ? (
                    <Spinner />
                ) : (
                    <motion.div
                        className="max-w-4xl mx-auto w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                            <div className="flex flex-col items-center gap-4 mb-8">
                                <div className="relative">
                                    <img
                                        src={user.profileImage?.url || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500/50"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full">
                                        <FaUserCircle className="w-6 h-6" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white">{user.userName}</h2>
                                <p className="text-gray-400">{user.role}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={itemVariants} className="bg-gray-800/40 rounded-xl p-4">
                                    <h3 className="text-xl font-semibold text-indigo-300 mb-4">Personal Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <FaEnvelope className="text-indigo-400" />
                                            <div>
                                                <p className="text-gray-400 text-sm">Email</p>
                                                <p className="text-white">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaPhone className="text-indigo-400" />
                                            <div>
                                                <p className="text-gray-400 text-sm">Phone</p>
                                                <p className="text-white">{user.phone || "Not provided"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaMapMarkerAlt className="text-indigo-400" />
                                            <div>
                                                <p className="text-gray-400 text-sm">Address</p>
                                                <p className="text-white">{user.address || "Not provided"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaCalendarAlt className="text-indigo-400" />
                                            <div>
                                                <p className="text-gray-400 text-sm">Joined On</p>
                                                <p className="text-white">{user.createdAt?.substring(0, 10) || "Not available"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {user.role === "Auctioneer" && (
                                    <motion.div variants={itemVariants} className="bg-gray-800/40 rounded-xl p-4">
                                        <h3 className="text-xl font-semibold text-indigo-300 mb-4">Payment Information</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <FaMoneyBillTransfer className="text-indigo-400" />
                                                <div>
                                                    <p className="text-gray-400 text-sm">Bank Name</p>
                                                    <p className="text-white">{user.paymentMethods?.bankTransfer?.bankName || "Not provided"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaUnlockAlt className="text-indigo-400" />
                                                <div>
                                                    <p className="text-gray-400 text-sm">Bank Account (IBAN)</p>
                                                    <p className="text-white">{user.paymentMethods?.bankTransfer?.bankAccountNumber || "Not provided"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaUserTag className="text-indigo-400" />
                                                <div>
                                                    <p className="text-gray-400 text-sm">Account Holder Name</p>
                                                    <p className="text-white">{user.paymentMethods?.bankTransfer?.bankAccountName || "Not provided"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {user.role === "Bidder" && (
                                    <motion.div variants={itemVariants} className="bg-gray-800/40 rounded-xl p-4">
                                        <h3 className="text-xl font-semibold text-indigo-300 mb-4">Bidding Statistics</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <FaMoneyBillWave className="text-indigo-400" />
                                                <div>
                                                    <p className="text-gray-400 text-sm">Total Money Spent</p>
                                                    <p className="text-white">${user.moneySpent || 0}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaUserTag className="text-indigo-400" />
                                                <div>
                                                    <p className="text-gray-400 text-sm">Auctions Won</p>
                                                    <p className="text-white">{user.auctionsWon || 0}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default UserProfile;