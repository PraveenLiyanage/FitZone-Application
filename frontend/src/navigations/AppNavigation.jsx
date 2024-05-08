import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CommunityForm from "../pages/CommunityForm";
import CommunityDis from "../pages/CommunityDisplay";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const AppNavigation = () => {
  return (
    <div className="h-dvh">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/communityform" element={<CommunityForm/>} />
          <Route path="/communitydis" element={<CommunityDis/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default AppNavigation;
