// Navbar.js

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { CATEGORY_LIST_QUERY } from './config'; // Import the GraphQL query from config.js
import './Navbar.css'; // Import the CSS file
import logo from './tg.png';
import Products from './Product'; // Import the Products component

function Navbar() {
  // State variable to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(CATEGORY_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract the categories from the fetched data
  const categories = data.categories.edges;

  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          {categories.map((category) => (
            <li
              key={category.node.id}
              onClick={() => setSelectedCategory(category.node)} // Set the selected category on click
              className={selectedCategory === category.node ? 'active' : ''}
            >
              {category.node.name}
            </li>
          ))}
        </ul>
      </nav>
      {selectedCategory && (
        <div className="products-container">
          <h2>Products for Category: {selectedCategory.name}</h2>
          {/* Render products for the selected category */}
          <Products categoryId={selectedCategory.id} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
