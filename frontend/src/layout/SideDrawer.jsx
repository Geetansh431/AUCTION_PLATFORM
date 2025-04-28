import React, { useState } from 'react'
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/userSlice';
import { Link } from "react-router-dom"

const SideDrawer = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    const NavLink = ({ to, icon: Icon, children }) => (
        <Link
            to={to}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 transition-all duration-300"
        >
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800/50 group-hover:bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:shadow-lg group-hover:shadow-violet-500/20 transition-all duration-300">
                <Icon className="w-4 h-4" />
            </span>
            <span className="text-sm font-medium tracking-wide">{children}</span>
        </Link>
    );

    return (
        <>
            <button
                onClick={() => setShow(!show)}
                className="fixed right-4 top-4 bg-slate-900/80 backdrop-blur-xl text-white text-xl p-3 rounded-2xl shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 hover:scale-105 transition-all duration-300 lg:hidden z-50 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
                <GiHamburgerMenu />
            </button>

            <div className={`w-full sm:w-72 bg-slate-950/95 h-screen fixed top-0 ${show ? "left-0" : "-left-full"} transition-all duration-500 lg:left-0 border-r border-slate-800/50 shadow-2xl z-40 backdrop-blur-2xl flex flex-col`}>
                <div className="flex-1 flex flex-col p-2 overflow-y-auto">
                    <Link to="/" className="block mb-8 px-4">
                        <h4 className="text-3xl font-black tracking-tight">
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent animate-gradient">Bid</span>
                            <span className="text-white ml-2">Bazzar</span>
                        </h4>
                    </Link>

                    <nav className="flex-1 space-y-4">
                        <div>
                            <div className="px-4 mb-3">
                                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                    Main Menu
                                </h2>
                            </div>
                            <ul className="space-y-1">
                                <li><NavLink to="/auctions" icon={RiAuctionFill}>Auctions</NavLink></li>
                                <li><NavLink to="/leaderboard" icon={MdLeaderboard}>Leaderboard</NavLink></li>
                                {isAuthenticated && <li><NavLink to="/me" icon={FaUserCircle}>Profile</NavLink></li>}
                            </ul>
                        </div>

                        {isAuthenticated && user?.role === "Auctioneer" && (
                            <div>
                                <div className="px-4 mb-3">
                                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                        Auctioneer Tools
                                    </h2>
                                </div>
                                <ul className="space-y-1">
                                    <li><NavLink to="/submit-commission" icon={FaFileInvoiceDollar}>Submit Commission</NavLink></li>
                                    <li><NavLink to="/create-auction" icon={IoIosCreate}>Create Auction</NavLink></li>
                                    <li><NavLink to="/view-my-auctions" icon={FaEye}>View My Auctions</NavLink></li>
                                </ul>
                            </div>
                        )}

                        {isAuthenticated && user?.role === "Super Admin" && (
                            <div>
                                <div className="px-4 mb-3">
                                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                        Admin
                                    </h2>
                                </div>
                                <ul className="space-y-1">
                                    <li><NavLink to="/dashboard" icon={MdDashboard}>Dashboard</NavLink></li>
                                </ul>
                            </div>
                        )}

                        <div>
                            <div className="px-4 mb-3">
                                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                    Support
                                </h2>
                            </div>
                            <ul className="space-y-1">
                                <li><NavLink to="/how-it-works-info" icon={SiGooglesearchconsole}>How it works</NavLink></li>
                                <li><NavLink to="/about" icon={BsFillInfoSquareFill}>About Us</NavLink></li>
                            </ul>
                        </div>
                    </nav>

                    <div className="mt-6 px-4">
                        {!isAuthenticated ? (
                            <div className="flex gap-3">
                                <Link
                                    to="/sign-up"
                                    className="flex-1 px-4 py-2.5 text-center text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 shadow-lg shadow-violet-500/25"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/sign-in"
                                    className="flex-1 px-4 py-2.5 text-center text-sm font-medium text-white bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-xl"
                                >
                                    Login
                                </Link>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-rose-500/25"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    <button 
                        onClick={() => setShow(!show)} 
                        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-300 sm:hidden"
                    >
                        <IoMdCloseCircleOutline className="w-6 h-6" />
                    </button>

                    <div className="mt-16 px-4 py-6 border-t border-slate-800/50">
                        <div className="flex gap-3 mb-4">
                            <Link 
                                to="/" 
                                className="p-2 rounded-lg bg-slate-800/50 text-violet-400 hover:bg-violet-500 hover:text-white transition-all duration-300"
                            >
                                <FaFacebook className="w-5 h-5" />
                            </Link>
                            <Link 
                                to="/" 
                                className="p-2 rounded-lg bg-slate-800/50 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white transition-all duration-300"
                            >
                                <RiInstagramFill className="w-5 h-5" />
                            </Link>
                        </div>
                        
                        <div className="space-y-2">
                            <Link 
                                to="/contact" 
                                className="block text-sm text-gray-400 hover:text-violet-400 transition-colors duration-300"
                            >
                                Contact Us
                            </Link>
                            <p className="text-xs text-gray-500">&copy; Bid Bazzar, LLC</p>
                            <p className="text-xs text-gray-500">
                                Designed By{" "}
                                <Link 
                                    to="https://github.com/Geetansh431" 
                                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300"
                                >
                                    Geetansh431
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideDrawer;