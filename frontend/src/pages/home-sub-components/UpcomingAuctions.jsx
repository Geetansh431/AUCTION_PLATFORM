import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UpcomingAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

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
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full -mr-48 -mt-48 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl rounded-full -ml-48 -mb-48 animate-pulse" />

      <motion.section
        className="relative my-8 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="px-8"
          variants={itemVariants}
        >
          <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
            Auctions For Today
          </h3>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 p-8"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="relative group h-full"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500" />
            
            <div className="relative bg-gradient-to-br from-[#1a1b26] to-[#24283b] w-full h-full p-6 rounded-2xl flex flex-col justify-between border border-blue-500/10 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <span className="rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white w-fit p-3 mb-4 shadow-lg shadow-blue-500/20">
                <RiAuctionFill className="text-2xl" />
              </span>
              <div>
                <h3 className="text-blue-400 text-xl font-semibold mb-2 tracking-wide">
                  Auctions For
                </h3>
                <h3 className="text-white text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                  Today
                </h3>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-500/10">
                <p className="text-blue-300/70 text-sm">
                  {auctionsStartingToday.length} {auctionsStartingToday.length === 1 ? 'auction' : 'auctions'} available
                </p>
              </div>
            </div>
          </motion.div>

          {auctionsStartingToday.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="col-span-full text-center py-8"
            >
              <p className="text-white/70 text-lg">No auctions scheduled for today</p>
            </motion.div>
          ) : (
            auctionsStartingToday.map((element, index) => (
              <motion.div
                key={element._id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative group h-full"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500" />
                
                <Link
                  to={`/auction/item/${element._id}`}
                  className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col gap-4 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <p className="text-white font-medium text-sm">
                      {element.title}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-indigo-200 font-semibold text-sm">
                      Starting Bid:
                    </p>
                    <p className="text-[#fdba88] font-bold">
                      Rs. {element.startingBid}
                    </p>
                  </div>
                  <div>
                    <p className="text-indigo-200 font-semibold text-sm">Starting Time:</p>
                    <p className="text-white text-xs font-medium">{formatDateTime(element.startTime)}</p>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.section>

      {loading && (
        <motion.div 
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-16 h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingAuctions;