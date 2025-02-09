import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "@/store/slices/userSlice";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [bankAccountName, setBankAccountName] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [razorpayAccountNumber, setRazorpayAccountNumber] = useState("");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [profileImagePreview, setProfileImagePreview] = useState("");

    const { loading, isAuthenticated } = useSelector(state => state.user)
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("address", address);
        formData.append("role", role);
        formData.append("profileImage", profileImage);
        role === "Auctioneer" &&
            (formData.append("bankAccountName", bankAccountName),
                formData.append("bankAccountNumber", bankAccountNumber),
                formData.append("bankName", bankName),
                formData.append("razorpayAccountNumber", razorpayAccountNumber),
                formData.append("paypalEmail", paypalEmail)
            );
        dispatch(register(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo("/");
        }
    }, [dispatch, loading, isAuthenticated]);

    const imageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setProfileImagePreview(reader.result)
            setProfileImage(file);
        };
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 lg:pl-72">
            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-white rounded-3xl shadow-lg backdrop-blur-sm bg-opacity-95 p-6 sm:p-8 lg:p-10 border border-gray-100">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                        Create Your Account
                    </h1>

                    <form className="space-y-10" onSubmit={handleRegister}>
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800">Personal Details</h2>
                                <div className="flex-grow h-px bg-gradient-to-r from-indigo-100 to-purple-100"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Full Name</label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Phone</label>
                                    <input
                                        type="number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70"
                                        placeholder="+1234567890"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Address</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70"
                                        placeholder="123 Street, City"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Role</label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70 cursor-pointer"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Auctioneer">Auctioneer</option>
                                        <option value="Bidder">Bidder</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700 tracking-wide">Profile Image</label>
                                <div className="flex items-center gap-6">
                                    <div className="relative group">
                                        <img
                                            src={profileImagePreview ? profileImagePreview : '/imageHolder.webp'}
                                            alt="profileImagePreview"
                                            className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/30 group-hover:border-indigo-500 transition-all duration-200"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl flex items-center justify-center text-white text-sm">
                                            Change
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        onChange={imageHandler}
                                        className="text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-semibold text-gray-800">Payment Details</h2>
                                <div className="flex-grow h-px bg-gradient-to-r from-indigo-100 to-purple-100"></div>
                            </div>
                            <p className="text-sm text-gray-500 -mt-6">Required only for Auctioneer registration</p>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Bank Details</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <select
                                            value={bankName}
                                            onChange={(e) => setBankName(e.target.value)}
                                            disabled={role === "Bidder"}
                                            className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50/30"
                                        >
                                            <option value="">Select Your Bank</option>
                                            <option value="SBI Bank">SBI Bank</option>
                                            <option value="HDFC">HDFC</option>
                                            <option value="PNB">PNB</option>
                                            <option value="Allied Bank">Allied Bank</option>
                                        </select>
                                        <input
                                            type="text"
                                            value={bankAccountNumber}
                                            placeholder="IBAN / IFSC"
                                            onChange={(e) => setBankAccountNumber(e.target.value)}
                                            disabled={role === "Bidder"}
                                            className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50/30"
                                        />
                                        <input
                                            type="text"
                                            value={bankAccountName}
                                            placeholder="Bank Account Name"
                                            onChange={(e) => setBankAccountName(e.target.value)}
                                            disabled={role === "Bidder"}
                                            className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Online Payment Details</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="number"
                                            value={razorpayAccountNumber}
                                            placeholder="Razorpay Account Number"
                                            onChange={(e) => setRazorpayAccountNumber(e.target.value)}
                                            disabled={role === "Bidder"}
                                            className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50/30"
                                        />
                                        <input
                                            type="email"
                                            value={paypalEmail}
                                            placeholder="PayPal Email"
                                            onChange={(e) => setPaypalEmail(e.target.value)}
                                            disabled={role === "Bidder"}
                                            className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/30 hover:bg-gray-50/70 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50/30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-500/20"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Registering...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    Register
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;