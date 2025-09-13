import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layout/SideDrawer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import { getAllAuctionItems } from "./store/slices/auctionSlice";
import Spinner from "./custom-components/Spinner";

// Lazy load components for code splitting
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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user data immediately for auth
    dispatch(fetchUser());
    
    // Delay getAllAuctionItems to prevent blocking initial render
    const timer = setTimeout(() => {
      dispatch(getAllAuctionItems());
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Router>
      <SideDrawer />
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      }>
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
