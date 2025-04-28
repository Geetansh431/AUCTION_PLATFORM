import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Clock } from "lucide-react";
import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";
import { motion } from "framer-motion";

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const dispatch = useDispatch();
  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
        <div className="relative bg-gray-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-gray-600 transition-all duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
          </div>

          <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 truncate">
              {title}
            </h3>

            <div className="space-y-4">
              {startingBid && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Starting Bid</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {startingBid}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {timeLeft.type}
                </span>
                <span className="text-orange-400 font-medium">
                  {Object.keys(timeLeft).length > 1
                    ? formatTimeLeft(timeLeft)
                    : "Time's up!"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
      <div className="flex flex-col gap-2 mt-4">
            <Link
              to={`/auction/details/${id}`}
          className="bg-indigo-600 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              View Auction
            </Link>
            <button
              onClick={handleDeleteAuction}
          className="bg-red-500 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25"
            >
              Delete Auction
            </button>
            <button
              disabled={new Date(endTime) > Date.now()}
              onClick={() => setOpenDrawer(true)}
          className="bg-sky-500 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Republish Auction
            </button>
          </div>

      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </motion.div>
  );
};

const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { loading } = useSelector((state) => state.auction);

  const handleRepublishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
  };

  return (
    <section
      className={`fixed ${
        openDrawer && id ? "bottom-0" : "-bottom-full"
      } left-0 w-full transition-all duration-300 h-full bg-[#00000087] flex items-end lg:left-72 lg:w-[calc(100%-18rem)]`}
    >
      <div className="w-full bg-gray-800 rounded-t-2xl p-6">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-center mb-2">
            Republish Auction
          </h3>
          <p className="text-gray-400 text-center mb-6">
            Let's republish auction with same details but new starting and ending time.
          </p>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-gray-300 font-medium">
                Republish Auction Start Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h:mm aa"}
                className="text-white text-[16px] py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/50 focus:outline-none focus:border-indigo-500 transition-colors duration-300 w-full"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-gray-300 font-medium">
                Republish Auction End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h:mm aa"}
                className="text-white text-[16px] py-3 px-4 bg-gray-700/30 rounded-xl border border-gray-600/50 focus:outline-none focus:border-indigo-500 transition-colors duration-300 w-full"
              />
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <button
                type="button"
                onClick={handleRepublishAuction}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-xl py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
              >
                {loading ? "Republishing..." : "Republish"}
              </button>
              <button
                type="button"
                onClick={() => setOpenDrawer(false)}
                className="bg-gray-700 text-white font-semibold text-xl py-3 rounded-xl hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CardTwo;
