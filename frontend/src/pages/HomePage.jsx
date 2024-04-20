import React from "react";
import "../assets/css/HomePage.css";


const HomePage = () => {
  return (
    <div>
      <div className="background-image">
        <div className="content">
          <h1>Welcome to FitZone</h1>
          <p>Start your fitness journey today!</p>
          <a href="#">
          <button className="button">Getting Started</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;