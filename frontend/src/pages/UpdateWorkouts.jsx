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
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(`http://localhost:9191/api/workouts/workout/${id}`);
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error loading workout:", error);
        alert("An error occurred while loading the workout.");
      }
    };

    loadUser();
  }, [id]);

  const onInputChange = (e) => {
    setWorkouts({ ...workouts, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9191/api/workouts/workout/${id}`, workouts);
      alert("Workout status updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating workout:", error);
      alert("An error occurred while updating the workout.");
    }
  };


  return (
    <div>
      {/* <NavBar /> */}
      <div className="form_box">
        <div>
          <h1 className="topic">
            Update Workout<span className="topicsub"> Status..!</span>
          </h1>

          <form onSubmit={(e) => onSubmit(e)} className="form_full">
            <label className="form_lable" htmlFor="date">
              Date:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="date"
              className="form_input"
              value={date}
              required
              name="date"
              placeholder="Enter date"
            />
            <br></br>
            <label className="form_lable" htmlFor="run">
              Distance Ran (km):
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="number"
              className="form_input"
              value={run}
              required
              name="run"
              placeholder="Enter distance ran"
            />
            <br></br>
            <label className="form_lable" htmlFor="pushups">
              Number of Pushups Completed:
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="number"
              className="form_input"
              value={pushups}
              name="pushups"
              placeholder="Enter number of pushups completed"
            />
            <br />
            <label className="form_lable" htmlFor="lifted">
              Weight Lifted (kg):
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="number"
              className="form_input"
              value={lifted}
              name="lifted"
              placeholder="Enter weight lifted"
            />
            <br />
            <label className="form_lable" htmlFor="description">
              Description:
            </label>
            <br></br>
            <textarea
              className="form_input"
              value={description}
              onChange={(e) => onInputChange(e)}
              name="description"
              placeholder="Enter a brief description"
            ></textarea>
            <button className="add_btnbtn">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateWorkouts;
