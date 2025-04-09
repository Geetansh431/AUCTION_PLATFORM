import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Gavel, Mail, CreditCard, ChevronRight } from 'lucide-react';
import FeaturedAuctions from './home-sub-components/FeaturedAuctions';
import UpcomingAuctions from './home-sub-components/UpcomingAuctions';
import Leaderboard from './home-sub-components/Leaderboard';

const Home = () => {
  const howItWorks = [
    {
      title: "Post Items",
      description: "List your items with detailed descriptions and starting bids to attract potential buyers.",
      icon: Package,
      gradient: "from-indigo-500 to-purple-500",
      iconColor: "text-indigo-400"
    },
    {
      title: "Place Bids",
      description: "Engage in competitive bidding with real-time updates and automatic bid increments.",
      icon: Gavel,
      gradient: "from-purple-500 to-pink-500",
      iconColor: "text-purple-400"
    },
    {
      title: "Win Notification",
      description: "Get instant notifications when you win an auction, with detailed next steps.",
      icon: Mail,
      gradient: "from-pink-500 to-red-500",
      iconColor: "text-pink-400"
    },
    {
      title: "Payment & Fees",
      description: "Secure payment processing with transparent fee structure - just 5% for auctioneers.",
      icon: CreditCard,
      gradient: "from-red-500 to-orange-500",
      iconColor: "text-red-400"
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:pl-72 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-16 sm:space-y-24 lg:space-y-32"
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

          <div className="relative max-w-4xl mx-auto text-center lg:text-left">
            <motion.div
              className="inline-block px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-indigo-400 font-medium">Transparency Leads to Your Victory</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Transparent Auctions
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Be The Winner
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-400 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              Join our trusted auction platform where transparency and fair bidding create opportunities for everyone.
            </motion.p>

            {!isAuthenticated && (
              <motion.div
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6"
                variants={itemVariants}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/sign-up"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-base sm:text-lg rounded-xl px-6 sm:px-8 py-3 sm:py-4 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 gap-2 group"
                  >
                    Start Bidding Now
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/sign-in"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-800/80 backdrop-blur-xl text-white font-semibold text-base sm:text-lg rounded-xl px-6 sm:px-8 py-3 sm:py-4 hover:shadow-lg hover:border-indigo-500/50 border-2 border-gray-700 transition-all duration-300"
                  >
                    Login to Your Account
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

       
        <motion.div
          className="space-y-8 sm:space-y-12 relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-16">
            <div className="space-y-2">
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                How it works
              </motion.h2>
              <motion.p
                className="text-gray-400 text-base sm:text-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
              >
                Simple steps to start your auction journey
              </motion.p>
            </div>
            <motion.a
              href="/how-it-works-info"
              className="flex items-center gap-2 text-base sm:text-lg text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              Learn more
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            variants={containerVariants}
          >
            {howItWorks.map((element, index) => (
              <motion.div
                key={element.title}
                className="relative group"
                variants={cardVariants}
                whileHover="hover"
              >
               
                <div className={`absolute inset-0 bg-gradient-to-br ${element.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                
                <div className="relative bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 h-full border border-gray-700/50 group-hover:border-gray-600 transition-all duration-300">
                  
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${element.gradient} p-0.5 mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-gray-900/90 rounded-2xl flex items-center justify-center">
                      <element.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${element.iconColor}`} />
                    </div>
                  </div>

                 
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {element.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {element.description}
                  </p>

             
                  <div className="absolute top-6 sm:top-8 right-6 sm:right-8 text-xs sm:text-sm font-medium text-gray-500">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>


        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          <motion.div variants={itemVariants}>
            <FeaturedAuctions />
          </motion.div>
          <motion.div variants={itemVariants}>
            <UpcomingAuctions />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Leaderboard />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;