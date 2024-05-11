import React, { useEffect, useState } from "react";
// import Header from "../components/shared/Header";
import { useNavigate, useParams } from "react-router";
import "../assets/css/meal.css";
import axios from "axios";

function UpdateMeal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mealplan, setMeal] = useState({
    name: "",
    recipe: "",
    info: "",
    size: "",
    imgUrl: "",
    date: "",
  });
  const { name, recipe, info, size, date, imgUrl } = mealplan;

  const onInputChange = (e) => {
    setMeal({ ...mealplan, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:9191/api/mealplans/meelplan/${id}`, mealplan);
    alert("meal Plane Update successfully");
    navigate("/");
  };
  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:9191/api/mealplans/meelplan/${id}`);
    setMeal(result.data);
  };
  return (
    <section className="update-meal-plan">
  <div className="container">
    <div className="form-box">
      <h1 className="topic">Update<span className="topicsub"> Meal Plan..!</span></h1>
      <form onSubmit={(e) => onSubmit(e)} className="form-full">
        <div className="form-group">
          <label className="form-label" htmlFor="imgUrl">Image URL:</label>
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
          <label className="form-label" htmlFor="date">Date:</label>
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
          <label className="form-label" htmlFor="name">Meal Nickname:</label>
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
          <label className="form-label" htmlFor="recipe">Meal Recipe:</label>
          <textarea
            onChange={(e) => onInputChange(e)}
            type="text"
            className="form-input"
            value={recipe}
            name="recipe"
            placeholder="Enter recipe"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="info">Meal Info:</label>
          <textarea
            onChange={(e) => onInputChange(e)}
            type="text"
            className="form-input"
            value={info}
            name="info"
            placeholder="Enter info"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="size">Meal Size:</label>
          <input
            className="form-input"
            value={size}
            onChange={(e) => onInputChange(e)}
            name="size"
            placeholder="Enter size"
          />
        </div>
        <button className="add-btn">Submit</button>
      </form>
    </div>
  </div>
</section>

  );
}

export default UpdateMeal;
