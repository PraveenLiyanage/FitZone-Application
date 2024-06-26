import React from "react";
import "../../assets/css/Header.css";
import fitZoneLogo from "../../assets/images/fitzone.png";

const Header = () => {
  return (
    <div className="header">
      {/* <div className="logo">FitZone</div> */}
      <a href="/">
      <img src={fitZoneLogo} alt="FitZone" className="logo" />
      </a>
      <nav className="nav-links">
        <a href="/communitydis">Community</a>
        <a href="/post">Post</a>
        <a href="/Workoutdis">Workout Status</a>
        <a href="/mealplandis">Meal Plan</a>
        <a href="#signup">Sign Up</a>
        <a href="#signin">Sign In</a>
      </nav>
    </div>
  );
};

export default Header;
