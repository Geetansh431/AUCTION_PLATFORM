import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function AuctionItem() {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
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
      transition: { duration: 0.5, ease: "easeOut" }
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
          <Link
            to={"/auctions"}
            className="font-semibold text-gray-300 hover:text-indigo-400 transition-all duration-300"
          >
            Auctions
          </Link>
          <FaGreaterThan className="text-gray-500" />
          <p className="text-gray-400">{auctionDetail.title}</p>
        </motion.div>

        {loading ? (
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl flex items-center justify-center z-50">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src={auctionDetail.image?.url}
                    alt={auctionDetail.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    {auctionDetail.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <p className="text-gray-400">Condition</p>
                      <p className="text-xl font-semibold text-indigo-400">
                        {auctionDetail.condition}
                      </p>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <p className="text-gray-400">Starting Bid</p>
                      <p className="text-xl font-semibold text-green-400">
                        Rs. {auctionDetail.startingBid}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white">Description</h4>
                    <hr className="border-gray-700" />
                    <div className="space-y-2">
                      {auctionDetail.description &&
                        auctionDetail.description.split(". ").map((element, index) => (
                          <p key={index} className="text-gray-300">
                            {element}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Bids</h3>
                <div className="space-y-4">
                  {auctionBidders && auctionBidders.length > 0 && 
                   new Date(auctionDetail.startTime) < Date.now() && 
                   new Date(auctionDetail.endTime) > Date.now() ? (
                    auctionBidders.map((element, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-700/30 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={element.profileImage}
                            alt={element.userName}
                            className="w-12 h-12 rounded-full"
                          />
                          <p className="text-lg font-semibold text-white">
                            {element.userName}
                          </p>
                        </div>
                        <span className={`text-lg font-semibold ${
                          index === 0 ? 'text-green-400' :
                          index === 1 ? 'text-blue-400' :
                          index === 2 ? 'text-yellow-400' :
                          'text-gray-400'
                        }`}>
                          {index === 0 ? '1st' :
                           index === 1 ? '2nd' :
                           index === 2 ? '3rd' :
                           `${index + 1}th`}
                        </span>
                      </div>
                    ))
                  ) : Date.now() < new Date(auctionDetail.startTime) ? (
                    <div className="text-center py-8">
                      <img
                        src="/notStarted.png"
                        alt="not-started"
                        className="w-full max-h-[300px] object-contain"
                      />
                      <p className="text-gray-400 mt-4">Auction has not started yet</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <img
                        src="/auctionEnded.png"
                        alt="ended"
                        className="w-full max-h-[300px] object-contain"
                      />
                      <p className="text-gray-400 mt-4">Auction has ended</p>
                    </div>
                  )}
                </div>
              </div>

              {Date.now() >= new Date(auctionDetail.startTime) &&
               Date.now() <= new Date(auctionDetail.endTime) && (
                <motion.div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6"
                  variants={itemVariants}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex-1">
                      <label className="block text-white font-semibold mb-2">
                        Place Your Bid
                      </label>
                      <input
                        type="number"
                        className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter bid amount"
                      />
                    </div>
                    <button
                      className="p-4 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300"
                      onClick={handleBid}
                    >
                      <RiAuctionFill className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default AuctionItem;
