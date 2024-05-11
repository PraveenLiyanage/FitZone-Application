import React, { useEffect, useState } from "react";
import "../assets/css/workout.css";
// import NavBar from "../assets/css/NavBar.css";
import { useNavigate } from "react-router";
import axios from "axios";

function AddWorkouts() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState({
    run: "",
    pushups: "",
    lifted: "",
    description: "",
    date: "",
  });
  const { run, pushups, lifted, description, date } = workouts;

  const onInputChange = (e) => {
    setWorkouts({ ...workouts, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:9191/api/workouts/workout", workouts);
    alert("Workout status uploaded successfully");
    navigate("/Workoutdis");
  };

  return (
    <section>
      <div className="form-container">
  <div className="form-box formbox-bk">
    <div className="">
      <div className="z-new">
        <h1 className="topic-new">
          Add New<span className="topicsub"> Workout Status</span>
        </h1>
        <form onSubmit={(e) => onSubmit(e)} className="form-full">
          <div className="form-group">
            <label className="form-label" htmlFor="date">Date:</label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="date"
              className="form-input"
              value={date}
              required
              name="date"
              placeholder="Enter date"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="run">Distance Ran (km):</label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="number"
              className="form-input"
              value={run}
              required
              name="run"
              placeholder="Enter distance ran"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="pushups">Number of Pushups Completed:</label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="number"
              className="form-input"
              value={pushups}
              name="pushups"
              placeholder="Enter number of pushups completed"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="lifted">Weight Lifted (kg):</label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="number"
              className="form-input"
              value={lifted}
              name="lifted"
              placeholder="Enter weight lifted"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="description">Description:</label>
            <br />
            <textarea
              className="form-input"
              value={description}
              onChange={(e) => onInputChange(e)}
              name="description"
              placeholder="Enter a brief description"
            ></textarea>
          </div>
          <button className="add-btn">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>

    </section>
  );
}

export default AddWorkouts;
