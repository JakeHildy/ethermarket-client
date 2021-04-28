import React from "react";
import "./Categories.scss";

function Categories({ categories, handleChange }) {
  return (
    <div className="categories">
      <h2 className="categories__heading">Categories</h2>
      {categories.map((category) => (
        <h3
          data-category={category}
          className="categories__list-item"
          key={category}
          onClick={handleChange}
        >
          {category}
        </h3>
      ))}
    </div>
  );
}

export default Categories;
