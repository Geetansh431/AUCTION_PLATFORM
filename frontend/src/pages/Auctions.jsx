import Card from "@/custom-components/Card";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Gavel, DollarSign, Clock } from "lucide-react";

const Auctions = () => {
    const { allAuctions, loading } = useSelector((state) => state.auction);

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
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:pl-72 overflow-hidden">
            {loading ? (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl flex items-center justify-center z-50">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                </div>
            ) : (
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-8 sm:space-y-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    <motion.div
                        className="relative overflow-hidden rounded-3xl bg-gray-800/30 backdrop-blur-xl p-6 sm:p-8 lg:p-12"
                        variants={itemVariants}
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full -mr-48 -mt-48 animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-3xl rounded-full -ml-48 -mb-48 animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm" />

                        <div className="relative max-w-4xl mx-auto text-center">
                            <motion.div
                                className="inline-block px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-indigo-400 font-medium">Live Auctions</span>
                            </motion.div>

                            <motion.h1
                                className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Discover
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    Amazing Deals
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-gray-400 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto"
                                variants={itemVariants}
                                whileHover={{ scale: 1.01 }}
                            >
                                Explore our collection of unique items and place your bids on the ones you love.
                            </motion.p>


                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
                                <motion.div
                                    className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Gavel className="w-6 h-6 text-indigo-400 mb-2" />
                                    <h3 className="text-white font-semibold text-lg">Active Auctions</h3>
                                    <p className="text-2xl font-bold text-indigo-400">{allAuctions?.length || 0}</p>
                                </motion.div>
                                <motion.div
                                    className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                                    <h3 className="text-white font-semibold text-lg">Total Value</h3>
                                    <p className="text-2xl font-bold text-green-400">
                                        Rs. {allAuctions?.reduce((acc, curr) => acc + curr.startingBid, 0) || 0}
                                    </p>
                                </motion.div>
                                <motion.div
                                    className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Clock className="w-6 h-6 text-blue-400 mb-2" />
                                    <h3 className="text-white font-semibold text-lg">Ending Today</h3>
                                    <p className="text-2xl font-bold text-blue-400">
                                        {allAuctions?.filter(auction => {
                                            const endDate = new Date(auction.endTime);
                                            const today = new Date();
                                            return endDate.toDateString() === today.toDateString();
                                        }).length || 0}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>


                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                        variants={containerVariants}
                    >
                        {allAuctions.map((element) => (
                            <motion.div
                                key={element._id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500" />

                                <div className="relative">
                                    <Card
                                        title={element.title}
                                        startTime={element.startTime}
                                        endTime={element.endTime}
                                        imgSrc={element.image?.url}
                                        startingBid={element.startingBid}
                                        id={element._id}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};

export default Auctions;