import React from "react";

const CategorySidebar = () => {
  return (
    <aside
      style={{ width: "200px", padding: "10px", borderRight: "1px solid #ddd" }}
    >
      <h3>Categories</h3>
      <ul>
        <li>Electronics</li>
        <li>Fashion</li>
        <li>Home Appliances</li>
        <li>Books</li>
      </ul>
    </aside>
  );
};

export default CategorySidebar;
