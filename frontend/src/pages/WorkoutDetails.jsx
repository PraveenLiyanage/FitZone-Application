import React, { useEffect, useState } from "react";
// import NavBar from "../assets/css/NavBar.css";
import axios from "axios";
import { useParams } from "react-router";
import "../assets/css/workout.css";
import { Link } from "react-router-dom";

export default function WorkoutDetails() {
  const [workouts, setWorkouts] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    const result = await axios.get("http://localhost:9191/api/workouts/workout");
    setWorkouts(result.data);
  };

  // Delete workout function
  const deleteWorkouts = async (id) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (confirmDelete) {
      try {
        // Send DELETE request to delete workout
        await axios.delete(`http://localhost:9191/api/workouts/workout/${id}`);
        // Reload workouts after successful deletion
        loadWorkouts();
        // Display success message
        alert("Workout deleted successfully!");
      } catch (error) {
        // Handle any errors
        console.error("Error deleting workout:", error);
        // Display error message
        alert("An error occurred while deleting the workout.");
      }
    }
  };
  return (
    <section>
    <div>
      {/* <NavBar /> */}
      <h1 className="topic">
        Your Workout<span className="topicsub"> Details..!</span>
      </h1>
      <a href="/Workoutform">
          <button className="btnbtndlt">Add Your Workout Status Here</button>
          </a>
      <div className="table_main">
        <table className="table_details_admin">
          <thead>
            <tr>
              <th className="admin_tbl_th">Num</th>
              <th className="admin_tbl_th">Distance Ran (km)</th>
              <th className="admin_tbl_th">Number of Pushups Completed</th>
              <th className="admin_tbl_th">Weight Lifted (kg)</th>
              <th className="admin_tbl_th">Date</th>
              <th className="admin_tbl_th">Description</th>
              <th className="admin_tbl_th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                <td className="admin_tbl_td">{index + 1}</td>
                <td className="admin_tbl_td">{workout.run}</td>
                <td className="admin_tbl_td">{workout.pushups}</td>
                <td className="admin_tbl_td">{workout.lifted}</td>
                <td className="admin_tbl_td">{workout.date}</td>
                <td className="admin_tbl_td">{workout.description}</td>
                <td className="admin_tbl_td">
                <Link to={`/updateworkout/${workout.id}`} className="btnbtn">
                    Update
                  </Link>
                  <br/><br/>
                  <button
                    onClick={() => deleteWorkouts(workout.id)} className="btnbtndlt">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </section>
  );
}

 
