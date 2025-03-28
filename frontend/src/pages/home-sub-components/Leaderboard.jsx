import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchLeaderboard } from "@/store/slices/userSlice";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { leaderboard, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

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
        className="relative my-4 sm:my-8 space-y-4 sm:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="px-4 sm:px-8 flex items-center gap-2 sm:gap-4"
          variants={itemVariants}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
            Top 10
          </h3>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400">
            Bidders
          </h3>
        </motion.div>

        <motion.div 
          className="px-2 sm:px-8"
          variants={itemVariants}
        >
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden">
              <thead className="bg-white/20">
                <tr>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base">Rank</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base">Profile</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base hidden sm:table-cell">Username</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base">Bid Expenditure</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base hidden sm:table-cell">Auctions Won</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard && leaderboard.slice(0, 10).map((element, index) => (
                  <motion.tr
                    key={element._id}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: 'rgba(255,255,255,0.1)' 
                    }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-white/10 hover:bg-white/20 transition-all duration-300"
                  >
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-white font-bold text-sm sm:text-base">
                      {index + 1}
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <img
                        src={element.profileImage?.url}
                        alt={element.username}
                        className="h-8 w-8 sm:h-12 sm:w-12 object-cover rounded-full border-2 border-indigo-500/50"
                      />
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-white font-medium text-sm sm:text-base hidden sm:table-cell">
                      {element.userName}
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-[#fdba88] font-bold text-sm sm:text-base">
                      Rs. {element.moneySpent}
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-indigo-200 font-semibold text-sm sm:text-base hidden sm:table-cell">
                      {element.auctionsWon}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div 
          className="px-4 sm:px-8"
          variants={itemVariants}
        >
          <Link
            to={"/leaderboard"}
            className="relative group w-full"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500" />
            
            <div className="relative bg-white/10 backdrop-blur-lg text-white py-3 sm:py-4 text-center rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 text-sm sm:text-base">
              View Full Leaderboard
            </div>
          </Link>
        </motion.div>
      </motion.section>

      {loading && (
        <motion.div 
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;