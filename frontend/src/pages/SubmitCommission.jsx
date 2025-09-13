import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCommissionProof } from "@/store/slices/commissionSlice";
import { Upload, DollarSign, MessageSquare, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setProof(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:pl-72 pt-8">
      <motion.div 
        className="max-w-3xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-gray-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-gray-700 relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full -mr-32 -mt-32"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-3xl rounded-full -ml-32 -mb-32"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-3xl" />

          <div className="relative">
            <motion.div 
              className="mb-6 text-center"
              variants={itemVariants}
            >
              <motion.h2 
                className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Submit Commission
              </motion.h2>
              <motion.p 
                className="mt-2 text-gray-400"
                variants={itemVariants}
              >
                Complete your commission submission in seconds
              </motion.p>
            </motion.div>

            <form onSubmit={handlePaymentProof} className="grid grid-cols-2 gap-5">
              {/* Amount Input */}
              <motion.div 
                className="col-span-1 group"
                variants={itemVariants}
              >
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                  <motion.div 
                    className="p-1.5 bg-gray-700/50 rounded-lg group-hover:bg-gradient-to-r from-indigo-500 to-purple-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <DollarSign className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                  Amount
                </label>
                <motion.input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-700/50 hover:bg-gray-700/80 text-gray-100 placeholder-gray-500"
                  placeholder="Enter amount"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              {/* Comment Input */}
              <motion.div 
                className="col-span-1 group"
                variants={itemVariants}
              >
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                  <motion.div 
                    className="p-1.5 bg-gray-700/50 rounded-lg group-hover:bg-gradient-to-r from-indigo-500 to-purple-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                  Comment
                </label>
                <motion.textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={1}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-700/50 hover:bg-gray-700/80 text-gray-100 placeholder-gray-500 resize-none"
                  placeholder="Add comments..."
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              {/* Payment Proof Upload */}
              <motion.div 
                className="col-span-2 group"
                variants={itemVariants}
              >
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                  <motion.div 
                    className="p-1.5 bg-gray-700/50 rounded-lg group-hover:bg-gradient-to-r from-indigo-500 to-purple-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Upload className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                  Payment Proof
                </label>
                <motion.div
                  className={`relative border-2 rounded-xl transition-all ${
                    dragActive
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-gray-700 hover:border-indigo-500"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  whileHover={{ scale: 1.02 }}
                  animate={dragActive ? { scale: 1.03 } : { scale: 1 }}
                >
                  <input
                    type="file"
                    onChange={proofHandler}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <div className="text-center py-5">
                    <motion.div 
                      className="w-14 h-14 mx-auto bg-gradient-to-br from-gray-700/50 to-gray-700/30 rounded-2xl flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Upload className="h-6 w-6 text-indigo-400" />
                    </motion.div>
                    <div className="mt-2 flex text-sm leading-6 text-gray-400 justify-center items-center gap-1">
                      <span className="font-semibold text-indigo-400">Choose a file</span>
                      <span>or drag and drop</span>
                    </div>
                    <AnimatePresence>
                      {proof && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-2 text-sm text-indigo-400 bg-gradient-to-r from-gray-700/50 to-gray-700/30 py-1.5 px-4 rounded-lg inline-block"
                        >
                          {proof.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="col-span-2 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{loading ? "Uploading..." : "Submit Payment Proof"}</span>
                {loading ? (
                  <motion.div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SubmitCommission;