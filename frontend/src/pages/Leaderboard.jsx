import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchLeaderboard } from "@/store/slices/userSlice";
import { Trophy, Medal, Award, TrendingUp, DollarSign, Target } from "lucide-react";

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

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getTopThreeStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20";
      case 2:
        return "bg-gradient-to-r from-gray-500/10 to-gray-500/5 border-gray-500/20";
      case 3:
        return "bg-gradient-to-r from-amber-500/10 to-amber-500/5 border-amber-500/20";
      default:
        return "";
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:pl-72 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-8 sm:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
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
              <span className="text-indigo-400 font-medium">Top Performers</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Leaderboard
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Top Bidders
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-400 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              Discover the most successful bidders and their achievements in our auction platform.
            </motion.p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
              <motion.div
                className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <TrendingUp className="w-6 h-6 text-indigo-400 mb-2" />
                <h3 className="text-white font-semibold text-lg">Total Bidders</h3>
                <p className="text-2xl font-bold text-indigo-400">{leaderboard?.length || 0}</p>
              </motion.div>
              <motion.div
                className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                <h3 className="text-white font-semibold text-lg">Total Spent</h3>
                <p className="text-2xl font-bold text-green-400">
                  Rs. {leaderboard?.reduce((acc, curr) => acc + curr.moneySpent, 0) || 0}
                </p>
              </motion.div>
              <motion.div
                className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Target className="w-6 h-6 text-blue-400 mb-2" />
                <h3 className="text-white font-semibold text-lg">Total Auctions Won</h3>
                <p className="text-2xl font-bold text-blue-400">
                  {leaderboard?.reduce((acc, curr) => acc + curr.auctionsWon, 0) || 0}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gray-800/30 backdrop-blur-xl p-4 sm:p-6 lg:p-8"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm" />
          
          <div className="relative overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="py-4 px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base">Rank</th>
                  <th className="py-4 px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base">Profile</th>
                  <th className="py-4 px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base">Username</th>
                  <th className="py-4 px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base">Bid Expenditure</th>
                  <th className="py-4 px-6 text-left text-indigo-200 font-semibold text-sm sm:text-base">Auctions Won</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard && leaderboard.map((element, index) => (
                  <motion.tr
                    key={element._id}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: 'rgba(255,255,255,0.1)' 
                    }}
                    transition={{ duration: 0.3 }}
                    className={`border-b border-gray-700/30 hover:bg-white/5 transition-all duration-300 ${getTopThreeStyle(index + 1)}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {getRankIcon(index + 1)}
                        <span className={`text-white font-bold text-sm sm:text-base ${
                          index < 3 ? 'text-lg sm:text-xl' : ''
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative group">
                        <img
                          src={element.profileImage?.url}
                          alt={element.username}
                          className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-full border-2 border-indigo-500/50 group-hover:border-indigo-500 transition-all duration-300"
                        />
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-2 border-gray-900" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`text-white font-medium text-sm sm:text-base ${
                          index < 3 ? 'text-lg sm:text-xl' : ''
                        }`}>
                          {element.userName}
                        </span>
                        {index < 3 && (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                            Top {index + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#fdba88]" />
                        <span className="text-[#fdba88] font-bold text-sm sm:text-base">
                          Rs. {element.moneySpent}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-400" />
                        <span className="text-indigo-200 font-semibold text-sm sm:text-base">
                          {element.auctionsWon}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

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
    </section>
  );
};

export default Leaderboard;