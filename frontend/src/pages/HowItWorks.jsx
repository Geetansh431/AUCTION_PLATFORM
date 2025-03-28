import React from "react";
import {
    FaUser,
    FaGavel,
    FaEnvelope,
    FaDollarSign,
    FaFileInvoice,
    FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUser />,
            title: "User Registration",
            description:
                "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.",
        },
        {
            icon: <FaGavel />,
            title: "Role Selection",
            description:
                'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
        },
        {
            icon: <FaEnvelope />,
            title: "Winning Bid Notification",
            description:
                "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Razorpay, and PayPal.",
        },
        {
            icon: <FaDollarSign />,
            title: "Commission Payment",
            description:
                "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent.",
        },
        {
            icon: <FaFileInvoice />,
            title: "Proof of Payment",
            description:
                "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.",
        },
        {
            icon: <FaRedo />,
            title: "Reposting Items",
            description:
                "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#1a1f27] lg:ml-[280px] p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 animate-fade-in bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    How Bid Bazzar Works
                    <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-indigo-400 to-purple-400 mt-2 animate-width-expand"></div>
                </h1>

                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            className="bg-[#1e242e] rounded-lg p-4 sm:p-6 hover:bg-[#252b36] transition-all duration-500 border border-gray-800 hover:border-[#ee4d2d] group animate-slide-up"
                            style={{
                                animationDelay: `${index * 150}ms`
                            }}
                        >
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center text-white text-lg sm:text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        {step.icon}
                                    </div>
                                </div>
                                <div className="transform transition-all duration-300 group-hover:translate-x-2">
                                    <div className="text-[#ee4d2d] text-xs sm:text-sm font-medium mb-1 sm:mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Step {(index + 1).toString().padStart(2, '0')}
                                    </div>
                                    <h3 className="text-white text-lg sm:text-xl font-semibold mb-1 sm:mb-2 group-hover:text-[#ee4d2d] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes width-expand {
                    from { width: 0; }
                    to { width: 6rem; }
                }

                @keyframes slide-up {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-width-expand {
                    animation: width-expand 0.8s ease-out forwards;
                }

                .animate-slide-up {
                    opacity: 0;
                    animation: slide-up 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default HowItWorks;