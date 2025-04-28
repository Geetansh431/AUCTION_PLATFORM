import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showProof, setShowProof] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800/40 backdrop-blur-lg rounded-2xl overflow-hidden">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="py-4 px-6 text-left text-indigo-300 font-semibold">User ID</th>
              <th className="py-4 px-6 text-left text-indigo-300 font-semibold">Amount</th>
              <th className="py-4 px-6 text-left text-indigo-300 font-semibold">Status</th>
              <th className="py-4 px-6 text-left text-indigo-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <motion.tr
                  key={index}
                  className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="py-4 px-6">{element.userId}</td>
                  <td className="py-4 px-6">${element.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      element.status === "Approved" ? "bg-green-500/20 text-green-400" :
                      element.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {element.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-lg hover:bg-indigo-500/30 transition-colors duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          handleFetchPaymentDetail(element._id);
                        }}
                      >
                        Update
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowProof(true);
                          handleFetchPaymentDetail(element._id);
                        }}
                      >
                        View Proof
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePaymentProofDelete(element._id);
                        }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-400">
                  No payment proofs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
      <ProofViewer showProof={showProof} setShowProof={setShowProof} />
    </>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof?.amount || "");
  const [status, setStatus] = useState(singlePaymentProof?.status || "");

  const dispatch = useDispatch();

  useEffect(() => {
    if (singlePaymentProof) {
      setAmount(singlePaymentProof.amount || "");
      setStatus(singlePaymentProof.status || "");
    }
  }, [singlePaymentProof]);

  const handlePaymentProofUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
      setOpenDrawer(false);
    } catch (error) {
      console.error("Error updating payment proof:", error);
    }
  };

  return (
    <AnimatePresence>
      {openDrawer && singlePaymentProof && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setOpenDrawer(false)}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-800 rounded-t-2xl p-6 z-50 max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-indigo-300">Update Payment Proof</h3>
              <button
                onClick={() => setOpenDrawer(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePaymentProofUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">User ID</label>
                <input
                  type="text"
                  value={singlePaymentProof.userId || ""}
                  disabled
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Settled">Settled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Comment</label>
                <textarea
                  rows={5}
                  value={singlePaymentProof.comment || ""}
                  disabled
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400"
                />
              </div>

              <div>
                <Link
                  to={singlePaymentProof.proof?.url || ""}
                  target="_blank"
                  className="block w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 text-center"
                >
                  View Payment Proof
                </Link>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Payment Proof"}
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const ProofViewer = ({ showProof, setShowProof }) => {
  const { singlePaymentProof } = useSelector((state) => state.superAdmin);

  return (
    <AnimatePresence>
      {showProof && singlePaymentProof && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowProof(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-indigo-300">Payment Proof</h3>
                <button
                  onClick={() => setShowProof(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">User ID</label>
                  <p className="text-white">{singlePaymentProof.userId}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                  <p className="text-white">${singlePaymentProof.amount}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    singlePaymentProof.status === "Approved" ? "bg-green-500/20 text-green-400" :
                    singlePaymentProof.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {singlePaymentProof.status}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Comment</label>
                  <p className="text-white">{singlePaymentProof.comment || "No comment available"}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Proof Image</label>
                  {singlePaymentProof.proof?.url ? (
                    <img
                      src={singlePaymentProof.proof.url}
                      alt="Payment Proof"
                      className="max-w-full h-auto rounded-lg border border-gray-700"
                    />
                  ) : (
                    <p className="text-gray-400">No proof image available</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};