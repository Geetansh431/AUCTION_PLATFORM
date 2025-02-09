import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCommissionProof } from "@/store/slices/commissionSlice";
import { Upload, DollarSign, MessageSquare, ArrowRight } from "lucide-react";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

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
    <div className="h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-purple-50 to-cyan-100 lg:pl-72 pt-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-white/20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl rounded-full -ml-32 -mb-32" />
          
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-3xl" />

          <div className="relative">
            <div className="mb-6 text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Submit Commission
              </h2>
              <p className="mt-2 text-gray-600">Complete your commission submission in seconds</p>
            </div>

            <form onSubmit={handlePaymentProof} className="grid grid-cols-2 gap-5">
              <div className="col-span-1 group">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <DollarSign className="w-4 h-4 text-indigo-600" />
                  </div>
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80"
                  placeholder="Enter amount"
                />
              </div>

              <div className="col-span-1 group">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                  </div>
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={1}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80 resize-none"
                  placeholder="Add comments..."
                />
              </div>

              <div className="col-span-2 group">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <Upload className="w-4 h-4 text-indigo-600" />
                  </div>
                  Payment Proof
                </label>
                <div
                  className={`relative border-2 rounded-xl transition-all ${
                    dragActive
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-gray-100 hover:border-indigo-200"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={proofHandler}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <div className="text-center py-5">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Upload className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="mt-2 flex text-sm leading-6 text-gray-600 justify-center items-center gap-1">
                      <span className="font-semibold text-indigo-600">Choose a file</span>
                      <span>or drag and drop</span>
                    </div>
                    {proof && (
                      <div className="mt-2 text-sm text-indigo-600 bg-gradient-to-r from-indigo-50 to-cyan-50 py-1.5 px-4 rounded-lg inline-block">
                        {proof.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="col-span-2 py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                <span className="text-lg">{loading ? "Uploading..." : "Submit Payment Proof"}</span>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitCommission;