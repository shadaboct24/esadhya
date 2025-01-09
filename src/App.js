import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoHeader from "./components/logoheader";
import Navbar from "./components/navBar";
import TopHeader from "./components/topheader";
import Home from "./components/home";
import LoginPage from "./components/login_logout/login";
import Signup from "./components/signup/Signup";
import DashboardLayoutBasic from "./components/Dashboard/dashboard";
import AboutUs from "./components/Aboutus/aboutus";
import Help from "./components/Help/help";
import NewAdmission from "./components/NewSchoolRegistration/newschool";
import Footer from "./footer";
import ForgotPassword from "./components/forgotpassword/forgotpassword";
import UserProfile from "./components/login_logout/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SensoryScreening from "./components/Assessments/Sensory_Screening_Checklist";
import ISAA from "./components/Assessments/ISAA";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <TopHeader />
      <LogoHeader />
      <Navbar />

      {/* <div className="scrollable-container"> */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/dashboard" element={<DashboardLayoutBasic />} />
        <Route path="/newreg" element={<NewAdmission />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/sensoryscreening" element={<SensoryScreening />} />
        <Route path="/isaa" element={<ISAA />} />
      </Routes>
      {/* </div> */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
