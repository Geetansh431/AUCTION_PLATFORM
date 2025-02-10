import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const About = () => {
    const values = [
        {
            id: 1,
            title: "Integrity",
            description:
                "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
        },
        {
            id: 2,
            title: "Innovation",
            description:
                "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
        },
        {
            id: 3,
            title: "Community",
            description:
                "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
        },
        {
            id: 4,
            title: "Customer Focus",
            description:
                "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:pl-72 pt-8">
            <motion.div
                className="max-w-7xl mx-auto px-6 py-16 space-y-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* About Us Section */}
                <motion.div
                    className="space-y-4 relative"
                    variants={itemVariants}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full -mr-32 -mt-32" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        About Us
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 relative">
                        Welcome to BidBazzar, the ultimate destination for online auctions
                        and bidding excitement. Founded in 2025, we are dedicated to
                        providing a dynamic and user-friendly platform for buyers and
                        sellers to connect, explore, and transact in a secure and seamless
                        environment.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    className="bg-gray-800/80 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700 relative overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-3xl" />
                    <div className="relative">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Our Mission
                        </h3>
                        <p className="text-lg text-gray-400">
                            At BidBazzar, our mission is to revolutionize the way people buy and
                            sell items online. We strive to create an engaging and trustworthy
                            marketplace that empowers individuals and businesses to discover
                            unique products, make informed decisions, and enjoy the thrill of
                            competitive bidding.
                        </p>
                    </div>
                </motion.div>

                {/* Values Section */}
                <motion.div variants={itemVariants} className="relative">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-3xl rounded-full -ml-32 -mb-32" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 relative">
                        Our Values
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((element, index) => (
                            <motion.div
                                key={element.id}
                                className="bg-gray-800/80 backdrop-blur-2xl rounded-3xl p-6 border border-gray-700 relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-300"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-3xl" />
                                <div className="relative">
                                    <div className="flex items-center mb-3">
                                        <ChevronRight className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 ml-2">
                                            {element.title}
                                        </h4>
                                    </div>
                                    <p className="text-gray-400">
                                        {element.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Story Section */}
                <motion.div
                    className="bg-gray-800/80 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700 relative overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-3xl" />
                    <div className="relative">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Our Story
                        </h3>
                        <p className="text-lg text-gray-400">
                            Founded by Geetansh431, BidBazzar was born out of a passion for
                            connecting people with unique and valuable items. With years of
                            experience in the auction industry, our team is committed to
                            creating a platform that offers an unparalleled auction experience
                            for users worldwide.
                        </p>
                    </div>
                </motion.div>

                {/* Join Us Section */}
                <motion.div
                    className="bg-gray-800/80 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700 relative overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-3xl" />
                    <div className="relative">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Join Us
                        </h3>
                        <p className="text-lg text-gray-400 mb-6">
                            Whether you're looking to buy, sell, or simply explore, BidBazzar
                            invites you to join our growing community of auction enthusiasts.
                            Discover new opportunities, uncover hidden gems, and experience the
                            thrill of winning your next great find.
                        </p>
                        <motion.div
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.button
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Started Now
                            </motion.button>
                        </motion.div>
                        <p className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mt-8 text-center">
                            Thank you for choosing BidBazzar. We look forward to being a part of
                            your auction journey!
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;