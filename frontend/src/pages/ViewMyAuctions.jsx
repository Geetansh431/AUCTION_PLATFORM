import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiAuctionFill, RiAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <article className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:pl-72 overflow-hidden py-8">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full -mr-48 -mt-48 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl rounded-full -ml-48 -mb-48 animate-pulse" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-4">
            <RiAuctionFill className="text-4xl text-indigo-400" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
              My Auctions
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-sm">Manage your auction listings</span>
            <span className="text-indigo-400">•</span>
            <span className="text-sm">{myAuctions.length} auctions</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <Link
            to="/create-auction"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
          >
            <RiAddLine className="text-xl" />
            <span className="font-semibold">Create New Auction</span>
          </Link>
        </motion.div>

        {loading ? (
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl flex items-center justify-center z-50">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
          </div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {myAuctions.length > 0 ? (
              myAuctions.map((element) => (
                <CardTwo
                  key={element._id}
                  title={element.title}
                  startingBid={element.startingBid}
                  endTime={element.endTime}
                  startTime={element.startTime}
                  imgSrc={element.image?.url}
                  id={element._id}
                />
              ))
            ) : (
              <motion.div
                variants={itemVariants}
                className="col-span-full text-center py-12"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/40 flex items-center justify-center">
                    <RiAuctionFill className="text-4xl text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">
                    No Auctions Yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    You haven't created any auctions yet. Start by creating your first auction!
                  </p>
                  <Link
                    to="/create-auction"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
                  >
                    <RiAddLine className="text-xl" />
                    <span className="font-semibold">Create First Auction</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </article>
  );
};

export default ViewMyAuctions;
