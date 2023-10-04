import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { CATEGORY_LIST_QUERY } from './config';
import './Navbar.css';
import logo from './tg.png';
import Products from './Product';

function Navbar() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { loading, error, data } = useQuery(CATEGORY_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data.categories.edges;

  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          <li
            onClick={() => setSelectedCategory(null)} // Set null to show all products
            className={!selectedCategory ? 'active' : ''}
          >
            All Products
          </li>
          {categories.map((category) => (
            <li
              key={category.node.id}
              onClick={() => setSelectedCategory(category.node)}
              className={selectedCategory === category.node ? 'active' : ''}
            >
              {category.node.name}
            </li>
          ))}
        </ul>
      </nav>
      <div className="products-container">
        <h2>
          {selectedCategory ? `Products for Category: ${selectedCategory.name}` : 'All Products'}
        </h2>
        <Products categoryId={selectedCategory ? selectedCategory.id : null} />
      </div>
    </div>
  );
}

export default Navbar;
