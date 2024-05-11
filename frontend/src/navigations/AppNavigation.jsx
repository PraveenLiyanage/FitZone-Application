import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CommunityForm from "../pages/CommunityForm";
import CommunityDis from "../pages/CommunityDisplay";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import Postdispaly from "../pages/Postdispaly";
import Postform from "../pages/Postform";
import WorkoutDis from "../pages/WorkoutDetails"
import WorkoutForm from "../pages/AddWorkouts"
import UpdateWorkouts from "../pages/UpdateWorkouts";

const AppNavigation = () => {
  return (
    <div className="h-dvh">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/communityform" element={<CommunityForm/>} />
          <Route path="/communitydis" element={<CommunityDis/>} />
          <Route path="/post" element={<Postdispaly/>} />
          <Route path="/Postform" element={<Postform/>} />
          <Route path="/Workoutdis" element={<WorkoutDis/>} />
          <Route path="/Workoutform" element={<WorkoutForm/>} />
          <Route path="/updateworkout" element={<UpdateWorkouts/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default AppNavigation;
