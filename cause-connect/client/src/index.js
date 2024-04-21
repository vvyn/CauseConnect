import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import VDLogin from "./pages/Volunteer-Donor/Login";
import VDSignUp from "./pages/Volunteer-Donor/SignUp";
import VDWelcome from "./pages/Volunteer-Donor/Welcome";
import VDProfile from "./pages/Volunteer-Donor/Profile";
import VDVolunteer from "./pages/Volunteer-Donor/Volunteer";
import VDDonor from "./pages/Volunteer-Donor/Donor";
import VDDonations from "./pages/Volunteer-Donor/Donations";
import VDDonationSummary from "./pages/Volunteer-Donor/DonationSummary";
import VDOpportunitySignUp from "./pages/Volunteer-Donor/OpportunitySignUp";
import VDDonationDetails from "./pages/Volunteer-Donor/DonationDetails";
import NPLogin from "./pages/NonProfit/Login";
import NPSignUp from "./pages/NonProfit/SignUp";
import NPWelcome from "./pages/NonProfit/Welcome";
import NPProfile from "./pages/NonProfit/Profile";
import NPDonor from "./pages/NonProfit/Donor";
import NPVolunteer from "./pages/NonProfit/Volunteer";
import Error from "./pages/Error";
import Dashboard from "./pages/dashboard/Dashboard";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="vd/signup" element={<VDSignUp />} />
          <Route path="vd/login" element={<VDLogin />} />
          <Route path="vd/welcome" element={<VDWelcome />} />
          <Route path="vd/profile" element={<VDProfile />} />
          <Route path="vd/donor" element={<VDDonor />} />
          <Route path="vd/donor/donationDetails/:id" element={<VDDonationDetails />} />
          <Route path="vd/donations" element={<VDDonations />} />
          <Route path="vd/donationSummary" element={<VDDonationSummary />} />
          <Route path="vd/volunteer" element={<VDVolunteer />} />
          <Route path="vd/volunteer/opportunitySignUp/:id" element={<VDOpportunitySignUp />} />
          <Route path="np/signup" element={<NPSignUp />} />
          <Route path="np/login" element={<NPLogin />} />
          <Route path="np/welcome" element={<NPWelcome />} />
          <Route path="np/profile" element={<NPProfile />} />
          <Route path="np/donor" element={<NPDonor />} />
          <Route path="np/volunteer" element={<NPVolunteer />} />
          <Route path="np/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
