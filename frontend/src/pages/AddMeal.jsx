import React, { useState } from "react";
// import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
import "../assets/css/meal.css";
import axios from "axios";

function AddMeal() {
  const navigate = useNavigate();
  const [mealplan, setMeal] = useState({
    name: "",
    recipe: "",
    info: "",
    size: "",
    date: "",
    imgUrl: "",
  });

  const { name, recipe, info, size, date, imgUrl } = mealplan;

  const onInputChange = (e) => {
    setMeal({ ...mealplan, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:9191/api/mealplans/meelplan", mealplan);
    alert("Meal Plan uploaded successfully");
    navigate("/mealplandis");
  };
  return (
    <section className="meal-plan-form">
      <div className="container">
        <h1 className="form-heading">Add New Meal Plan</h1>
        <form onSubmit={(e) => onSubmit(e)} className="form">
          <div className="form-group">
            <label htmlFor="imgUrl" className="form-label">
              Image URL:
            </label>
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form-input"
              value={imgUrl}
              required
              name="imgUrl"
              placeholder="Enter Image URL"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input
              onChange={(e) => onInputChange(e)}
              type="date"
              className="form-input"
              value={date}
              required
              name="date"
              placeholder="Enter Date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Meal Nickname:
            </label>
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form-input"
              value={name}
              required
              name="name"
              placeholder="Enter Meal Nickname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="size" className="form-label">
              Meal Size:
            </label>
            <input
              className="form-input"
              value={size}
              onChange={(e) => onInputChange(e)}
              name="size"
              placeholder="Enter Meal Size"
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipe" className="form-label">
              Meal Recipe:
            </label>
            <textarea
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form-input"
              value={recipe}
              name="recipe"
              placeholder="Enter Meal Recipe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="info" className="form-label">
              Meal Info:
            </label>
            <textarea
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form-input"
              value={info}
              name="info"
              placeholder="Enter Meal Info"
            />
          </div>
          <button className="add-btn">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default AddMeal;
