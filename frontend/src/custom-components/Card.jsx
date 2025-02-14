import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

function Card({ imgSrc, title, startingBid, startTime, endTime, id }) {
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

    return (
        <Link
            to={`/auction/item/${id}`}
            className="group relative flex-grow basis-full sm:basis-56 lg:basis-60 2xl:basis-80"
        >
            {/* Card background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            {/* Card content */}
            <div className="relative bg-gray-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-gray-600 transition-all duration-300">
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={imgSrc}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                </div>

                {/* Content section */}
                <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 truncate">
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
                                {Object.keys(timeLeft).length > 1 ? (
                                    formatTimeLeft(timeLeft)
                                ) : (
                                    "Time's up!"
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Card;