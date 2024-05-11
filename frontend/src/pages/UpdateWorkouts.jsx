import React, { useEffect, useState } from "react";
// import NavBar from "../assets/css/NavBar.css";
import { useNavigate, useParams } from "react-router";
import "../assets/css/workout.css";
import axios from "axios";

function UpdateWorkouts() {
  const navigate = useNavigate();
  const { id } = useParams();
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
  useEffect(() => {
    loadUser();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:9191/api/workouts/workout/${id}`, workouts);
    alert("Workout status Update successfully");
    navigate("/Workoutdis");
  };
  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:9191/api/workouts/workout/${id}`);
    setWorkouts(result.data);
  };
  return (
    <section className="update-workout-status">
  <div className="container">
    <div className="form-box">
      <div>
        <h1 className="topic">Update Workout<span className="topicsub"> Status..!</span></h1>
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
          <button className="update-btn">Update</button>
        </form>
      </div>
    </div>
  </div>
</section>

  );
}

export default UpdateWorkouts;
