import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "@/custom-components/Spinner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (user.role !== "Super Admin" || !isAuthenticated) {
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
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <article className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:pl-72 overflow-hidden py-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full -mr-48 -mt-48 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl rounded-full -ml-48 -mb-48 animate-pulse" />

          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
                Dashboard
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 gap-8">
              <motion.div variants={itemVariants} className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-indigo-300 mb-4">Monthly Total Payments Received</h3>
                <PaymentGraph />
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-indigo-300 mb-4">Users</h3>
                <BiddersAuctioneersGraph />
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-indigo-300 mb-4">Payment Proofs</h3>
                <PaymentProofs />
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-xl font-semibold text-indigo-300 mb-4">Delete Items From Auction</h3>
                <AuctionItemDelete />
              </motion.div>
            </div>
          </motion.div>
        </article>
      )}
    </>
  );
};

export default Dashboard;
