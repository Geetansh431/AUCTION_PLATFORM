import { useEffect, Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layout/SideDrawer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import { getAllAuctionItems } from "./store/slices/auctionSlice";

// Preload critical components to reduce lazy loading delays
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const SubmitCommission = lazy(() => import("./pages/SubmitCommission"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const About = lazy(() => import("./pages/About"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Auctions = lazy(() => import("./pages/Auctions"));
const AuctionItem = lazy(() => import("./pages/AuctionItem"));
const CreateAuction = lazy(() => import("./pages/CreateAuction"));
const ViewMyAuctions = lazy(() => import("./pages/ViewMyAuctions"));
const ViewAuctionDetails = lazy(() => import("./pages/ViewAuctionDetails"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Contact = lazy(() => import("./pages/Contact"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

// Lightweight loading component for route transitions
const RouteLoader = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="relative">
      <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
    </div>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Make API calls in parallel without blocking UI
    const initializeApp = async () => {
      try {
        // Start both API calls simultaneously
        const userPromise = dispatch(fetchUser());
        const auctionsPromise = dispatch(getAllAuctionItems());
        
        // Wait for user auth check (critical for app functionality)
        await userPromise;
        
        // Allow auctions to load in background
        auctionsPromise.finally(() => {
          // Small delay to prevent flash of loading states
          setTimeout(() => setInitialLoad(false), 300);
        });
        
      } catch (error) {
        console.error('App initialization error:', error);
        setInitialLoad(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  // Show initial loading only for first app load, not for route changes
  if (initialLoad) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl scale-150 animate-pulse"></div>
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <SideDrawer />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/submit-commission" element={<SubmitCommission />} />
          <Route path="/how-it-works-info" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/auction/item/:id" element={<AuctionItem />} />
          <Route path="/create-auction" element={<CreateAuction />} />
          <Route path="/view-my-auctions" element={<ViewMyAuctions />} />
          <Route path="/auction/details/:id" element={<ViewAuctionDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/me" element={<UserProfile />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default App;
