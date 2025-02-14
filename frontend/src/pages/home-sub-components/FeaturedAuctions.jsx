import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

function FeaturedAuctions() {
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
    <div className="relative w-full">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl rounded-full -ml-48 -mb-48" />

      <motion.div
        className="relative space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with consistent spacing */}
        <div className="flex items-center justify-between mb-8">
          <motion.h2 
            className="p-8 text-3xl lg:text-4xl font-bold text-white"
            variants={itemVariants}
          >
            Featured Auctions
          </motion.h2>
        </div>

        {/* Grid with consistent spacing */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 p-8"
          variants={containerVariants}
        >
          {allAuctions.slice(0, 8).map((auction) => (
            <motion.div
              key={auction._id}
              className="group relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              {/* Card content */}
              <div className="relative bg-gray-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-gray-600 transition-all duration-300">
                {/* Image container with consistent aspect ratio */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={auction.image?.url || "/api/placeholder/400/300"}
                    alt={auction.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                  
                  {/* Featured badge with consistent spacing */}
                  <div className="absolute top-4 right-4">
                    <div className="px-4 py-1 rounded-full bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20">
                      <span className="text-indigo-400 text-sm font-medium">Featured</span>
                    </div>
                  </div>
                </div>

                {/* Content section with consistent padding */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 truncate">
                    {auction.title}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Starting Bid</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        ${auction.startingBid}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time Left
                      </span>
                      <span className="text-orange-400 font-medium">
                        {auction.timeLeft || "Time's up!"}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl px-6 py-3 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 group">
                    Place Bid
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading state */}
        {loading && (
          <motion.div 
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default FeaturedAuctions;