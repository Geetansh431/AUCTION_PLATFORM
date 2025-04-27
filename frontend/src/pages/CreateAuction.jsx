import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { RiAuctionFill } from "react-icons/ri";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

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
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          <RiAuctionFill className="text-4xl text-indigo-400" />
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
            Create Auction
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative bg-gray-800/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-xl"
        >
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleCreateAuction}
          >
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-indigo-300 font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-white text-[16px] py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/50 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                  placeholder="Enter auction title"
                />
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-indigo-300 font-medium mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-white text-[16px] py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/50 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                >
                  <option value="">Select Category</option>
                  {auctionCategories.map((element) => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row mt-6">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-indigo-300 font-medium mb-2">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="text-white text-[16px] py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/50 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-indigo-300 font-medium mb-2">
                  Starting Bid
                </label>
                <input
                  type="number"
                  value={startingBid}
                  onChange={(e) => setStartingBid(e.target.value)}
                  className="text-white text-[16px] py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/50 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                  placeholder="Enter starting bid amount"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-6">
              <div className="flex flex-col w-full">
                <label className="text-[16px] text-indigo-300 font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-white text-[16px] py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/50 focus:outline-none focus:border-indigo-500 transition-colors duration-300 min-h-[200px] resize-none"
                  rows={8}
                  placeholder="Describe your auction item in detail"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row mt-6">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-indigo-300 font-medium mb-2">
                  Auction Starting Time
                </label>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                  className="text-white text-[16px] py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/50 focus:outline-none focus:border-indigo-500 transition-colors duration-300 w-full"
                  placeholderText="Select start date and time"
                />
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-indigo-300 font-medium mb-2">
                  Auction End Time
                </label>
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                  className="text-white text-[16px] py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/50 focus:outline-none focus:border-indigo-500 transition-colors duration-300 w-full"
                  placeholderText="Select end date and time"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <label className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
                Auction Item Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="relative group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
                  border-gray-600/50 hover:border-indigo-500/70 bg-gray-700/30 hover:bg-gray-700/50"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500" />
                  <div className="relative flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    {imagePreview ? (
                      <div className="relative w-44 h-44 mb-4 overflow-hidden rounded-lg border-2 border-indigo-500/30">
                        <img
                          src={imagePreview}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="p-4 rounded-full bg-gray-800/80 mb-4 group-hover:bg-gray-800 transition-colors duration-300">
                        <svg
                          className="w-10 h-10 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                      </div>
                    )}
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={imageHandler}
                  />
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-8 w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            >
              {loading ? "Creating..." : "Create Auction"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </article>
  );
};

export default CreateAuction;
